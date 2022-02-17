using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Domain.Interfaces;
using Domain.Interfaces.IHubs.IAccessors;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Security.Customer
{
    public record CustomerAuthRequirementLimitFriendsForSimpleCustomer(int Limit) : IAuthorizationRequirement;

    public class
        CustomerAuthRequirementLimitFriendsForSimpleCustomerHandler : AuthorizationHandler<
            CustomerAuthRequirementLimitFriendsForSimpleCustomer>
    {
        private readonly JwtService _jwtService;
        private readonly IApplicationDbContext _dbContext;
        private readonly INotifyHubAccessor _notifyHub;
        public CustomerAuthRequirementLimitFriendsForSimpleCustomerHandler(JwtService jwtService,
            IApplicationDbContext dbContext, INotifyHubAccessor notifyHub)
        {
            _jwtService = jwtService;
            _dbContext = dbContext;
            _notifyHub = notifyHub;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            CustomerAuthRequirementLimitFriendsForSimpleCustomer requirementLimitFriendsForSimpleCustomer)
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
                        var customerId = claimsIdentity.FindFirst("userId").Value.ToGuid();
                        if (_dbContext.Customers.IsPremiumAccount(customerId))
                        {
                            context.Succeed(requirementLimitFriendsForSimpleCustomer);
                            return Task.CompletedTask;
                        }

                        var friendsCount = _dbContext.Friends.Count(a => a.CustomerId == customerId &&
                                                                         a.CustomerFriendApproved);
                        if (friendsCount < requirementLimitFriendsForSimpleCustomer.Limit)
                        {
                            context.Succeed(requirementLimitFriendsForSimpleCustomer);
                            return Task.CompletedTask;
                        }

                        _notifyHub.NotifySelfAsync(
                            "کاربری گرامی.لطفا برای انجام این عملیه حساب کاربری خود را به نوع طلایی ارتقا دهید",
                            "error");
                    }
                }
            }

            throw new UnAuthorizedException();
        }
    }
}