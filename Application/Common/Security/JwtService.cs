using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace Application.Common.Security
{
    public class JwtService
    {
        private readonly JwtConfig _jwtConfig;
        private readonly TokenValidationParameters _tokenValidationParameters;
        public JwtService(JwtConfig jwtConfig, TokenValidationParameters tokenValidationParameters)
        {
            _jwtConfig = jwtConfig;
            _tokenValidationParameters = tokenValidationParameters;
        }

        public string GenerateToken(string userName, Guid userId, string userType, IEnumerable<Claim> customClaims)
        {
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_jwtConfig.Secret));
            var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credential);
            var claims = new List<Claim>()
            {
                new Claim("userId", userId.ToString()),
                new Claim("userName", userName),
                new Claim("userType", userType),
            };

            if (customClaims.IsNotNull() && customClaims.Any())
            {
                foreach (var claim in customClaims)
                {
                    claims.Add(claim);
                }
            }

            var payload = new JwtPayload(
                null,
                null,
                claims,
                null,
                DateTime.UtcNow.AddSeconds(60));
            var securityToken = new JwtSecurityToken(header, payload);

            var securityTokenHandler = new JwtSecurityTokenHandler();
            var token = securityTokenHandler.WriteToken(securityToken);
            return token;
        }

        public bool ValidateToken(string token)
        {
            try
            {
                var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
                 jwtSecurityTokenHandler.ValidateToken(
                    token,
                    _tokenValidationParameters,
                    out var validatedToken);
                if (validatedToken is JwtSecurityToken jwtSecurityToken)
                {
                    if (String.CompareOrdinal(jwtSecurityToken.Header.Alg, SecurityAlgorithms.HmacSha256Signature) != 0)
                    {
                        return false;
                    }
                }

                return true;
            }
            catch
            {
                return false;
            }
        }
        
        public bool ValidateToken(string token,out ClaimsPrincipal claimsPrincipal)
        {
            try
            {
                var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
               claimsPrincipal= jwtSecurityTokenHandler.ValidateToken(
                    token,
                    _tokenValidationParameters,
                    out var validatedToken);
                if (validatedToken is JwtSecurityToken jwtSecurityToken)
                {
                    if (String.CompareOrdinal(jwtSecurityToken.Header.Alg, SecurityAlgorithms.HmacSha256Signature) != 0)
                    {
                        return false;
                    }
                }

                return true;
            }
            catch
            {
                throw new UnAuthorizedException();
            }
        }

        public string RefreshToken(IRefreshTokenModel model)
        {
            try
            {
                var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
                var verifiedClaims = jwtSecurityTokenHandler.ValidateToken(
                    model.Token,
                    _tokenValidationParameters,
                    out var validatedToken);
                if (validatedToken is JwtSecurityToken jwtSecurityToken)
                {
                    if (String.CompareOrdinal(jwtSecurityToken.Header.Alg, SecurityAlgorithms.HmacSha256Signature) != 0)
                    {
                        throw new RefreshTokenValidationException("invalid algorithm");
                    }
                }

                var userName = verifiedClaims.FindFirstValue("userName");
                var userId = verifiedClaims.FindFirstValue("userId");
                var userType = verifiedClaims.FindFirstValue("userType");
                var claims = new List<Claim>();
                if (model.Claims.IsNotNull() && model.Claims.Any())
                {
                    foreach (var claim in model.Claims)
                    {
                        claims.Add(claim);
                    }
                }

                return GenerateToken(userName, userId.ToGuid(), userType,claims);
            }
            catch
            {
                throw new RefreshTokenValidationException("invalid token for refresh");
            }
        }
    }
}