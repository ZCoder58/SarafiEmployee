using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Security.Customer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Security
{
    public class TokenValidationRequirement:IAuthorizationRequirement
    {
    }

    public class HandleTokenValidationRequirement : AuthorizationHandler<TokenValidationRequirement>
    {
        private readonly JwtService _jwtToken;

        public HandleTokenValidationRequirement(JwtService jwtToken)
        {
            _jwtToken = jwtToken;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, TokenValidationRequirement requirement)
        {
            
            var httpContext = context.Resource as DefaultHttpContext;
            string accessToken =httpContext?.GetTokenAsync("access_token").Result;
            // string accessToken = httpContext?.Request.Query["access_token"];
            // string authorizationAccess = httpContext?.Request.Headers["Authorization"];
            // if (accessToken.IsNullOrEmpty() && !authorizationAccess.IsNullOrEmpty())
            // {
            //     accessToken = authorizationAccess.Split(" ").ElementAt(1);
            // }
            if (!accessToken.IsNullOrEmpty())
            {
                
                if (_jwtToken.ValidateToken(accessToken))
                {
                    context.Succeed(requirement);
                    return Task.CompletedTask;
                }
            } 
            throw new UnauthorizedAccessException("unauthorized access");
        }
    }
}