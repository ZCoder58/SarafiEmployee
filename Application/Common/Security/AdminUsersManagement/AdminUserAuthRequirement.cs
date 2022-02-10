using System.Security.Claims;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Statics;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Security.AdminUsersManagement
{
    public record AdminUserAuthRequirement : IAuthorizationRequirement;

    public class AdminUserAuthRequirementHandler : AuthorizationHandler<AdminUserAuthRequirement>
    {
        private readonly JwtService _jwtService;

        public AdminUserAuthRequirementHandler(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            AdminUserAuthRequirement requirement)
        {
            var httpContext = context.Resource as DefaultHttpContext;
            string accessToken =httpContext?.GetTokenAsync("access_token").Result;
            if (!accessToken.IsNullOrEmpty())
            {
                if (_jwtService.ValidateToken(accessToken, out var securityClaims))
                {
                    var claimsIdentity = securityClaims.Identity as ClaimsIdentity;

                    if (claimsIdentity.HasClaim("userType",UserTypes.ManagementType))
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