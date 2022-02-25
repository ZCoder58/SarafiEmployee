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
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Security.Customer
{
    public record CompanyLimitEmployeesRequirement(int Limit) : IAuthorizationRequirement;

    public class
        CompanyLimitEmployeesRequirementHandler : AuthorizationHandler<
            CompanyLimitEmployeesRequirement>
    {
        private readonly JwtService _jwtService;
        private readonly IApplicationDbContext _dbContext;
        private readonly INotifyHubAccessor _notifyHub;

        public CompanyLimitEmployeesRequirementHandler(JwtService jwtService,
            IApplicationDbContext dbContext, INotifyHubAccessor notifyHub)
        {
            _jwtService = jwtService;
            _dbContext = dbContext;
            _notifyHub = notifyHub;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            CompanyLimitEmployeesRequirement companyLimitEmployeesRequirement)
        {
            var httpContext = context.Resource as DefaultHttpContext;
            string accessToken = httpContext?.GetTokenAsync("access_token").Result;
            if (!accessToken.IsNullOrEmpty())
            {
                if (_jwtService.ValidateToken(accessToken, out var securityClaims))
                {
                    var claimsIdentity = securityClaims.Identity as ClaimsIdentity;

                    if (claimsIdentity.HasClaim("userType", UserTypes.CompanyType))
                    {
                        var customerId = claimsIdentity.FindFirst("userId").Value.ToGuid();
                        var targetCustomer = _dbContext.Customers.FirstOrDefault(a=>
                            a.Id==customerId &&
                            a.UserType==UserTypes.CompanyType);
                        if (targetCustomer.IsPremiumAccount)
                        {
                           
                                context.Succeed(companyLimitEmployeesRequirement);
                                return Task.CompletedTask;
                           
                        }

                        var employeesCount = _dbContext.Customers.Count(a =>
                            a.UserType==UserTypes.EmployeeType &&
                            a.CompanyId == targetCustomer.CompanyId);
                        if (employeesCount < companyLimitEmployeesRequirement.Limit)
                        {
                            context.Succeed(companyLimitEmployeesRequirement);
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