using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Statics;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Security.Customer
{
    public record CustomerAuthRequirement : IAuthorizationRequirement;

    public class CustomerAuthRequirementHandler : AuthorizationHandler<CustomerAuthRequirement>
    {
        private readonly JwtService _jwtService;

        public CustomerAuthRequirementHandler(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            CustomerAuthRequirement requirement)
        {
            var httpContext = context.Resource as DefaultHttpContext;
            string accessToken =httpContext?.GetTokenAsync("access_token").Result;
            if (!accessToken.IsNullOrEmpty())
            {
                if (_jwtService.ValidateToken(accessToken, out var securityClaims))
                {
                    var claimsIdentity = securityClaims.Identity as ClaimsIdentity;

                    if (claimsIdentity.HasClaim("userType",UserTypes.CustomerType))
                    {
                        context.Succeed(requirement);
                        return Task.CompletedTask;
                    }
                }
            }

            throw new UnAuthorizedException();

        }
    }
}