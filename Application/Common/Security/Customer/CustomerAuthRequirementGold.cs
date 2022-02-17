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
    public record CustomerAuthRequirementGold : IAuthorizationRequirement;

    public class CustomerAuthRequirementGoldHandler : AuthorizationHandler<CustomerAuthRequirementGold>
    {
        private readonly JwtService _jwtService;
        private readonly IApplicationDbContext _dbContext;

        public CustomerAuthRequirementGoldHandler(JwtService jwtService, IApplicationDbContext dbContext)
        {
            _jwtService = jwtService;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            CustomerAuthRequirementGold requirementGold)
        {
            var httpContext = context.Resource as DefaultHttpContext;
            string accessToken = httpContext?.GetTokenAsync("access_token").Result;
            if (!accessToken.IsNullOrEmpty())
            {
                if (_jwtService.ValidateToken(accessToken, out var securityClaims))
                {
                    var claimsIdentity = securityClaims.Identity as ClaimsIdentity;

                    if (claimsIdentity.HasClaim("userType", UserTypes.CustomerType))
                    {
                        if (_dbContext.Customers.IsPremiumAccount(claimsIdentity.FindFirst("userId").Value.ToGuid()))
                        {
                            context.Succeed(requirementGold);
                            return Task.CompletedTask;
                        }
                    }
                }
            }

            throw new UnAuthorizedException();
        }
    }
}