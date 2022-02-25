using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Security.Customer
{
    public record CustomerAuthRequirementSimple : IAuthorizationRequirement;

    public class CustomerAuthRequirementSimpleHandler : AuthorizationHandler<CustomerAuthRequirementSimple>
    {
        private readonly JwtService _jwtService;

        public CustomerAuthRequirementSimpleHandler(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            CustomerAuthRequirementSimple requirementGold)
        {
            
            var httpContext = context.Resource as DefaultHttpContext;
            string accessToken = httpContext?.GetTokenAsync("access_token").Result;
            if (!accessToken.IsNullOrEmpty())
            {
                if (_jwtService.ValidateToken(accessToken, out var securityClaims))
                {
                    var claimsIdentity = securityClaims.Identity as ClaimsIdentity;

                    if (claimsIdentity.HasClaim("userType", UserTypes.CustomerType) || claimsIdentity.HasClaim("userType", UserTypes.CompanyType))
                    {
                        context.Succeed(requirementGold);
                        return Task.CompletedTask;
                    }
                }
            }

            throw new UnAuthorizedException();
        }
    }
}