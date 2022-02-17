using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Security;
using Application.Common.Statics;
using Application.Website.Customers.DTOs;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Website.Customers.Auth.Command.ActivateCustomerAccount
{
    public class ActivateCustomerAccountHandler:IRequestHandler<ActivateCustomerAccountCommand,AccountActivationDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly JwtService _jwtService;

        public ActivateCustomerAccountHandler(IApplicationDbContext dbContext, JwtService jwtService)
        {
            _dbContext = dbContext;
            _jwtService = jwtService;
        }

        public async Task<AccountActivationDTo> Handle(ActivateCustomerAccountCommand request, CancellationToken cancellationToken)
        {
            var targetCustomer = _dbContext.Customers.FirstOrDefault(a => a.ActivationAccountCode == request.Id);
            targetCustomer.IsEmailVerified = true;
            targetCustomer.IsActive = true;
            await _dbContext.SaveChangesAsync(cancellationToken);
            var token=_jwtService.GenerateToken(targetCustomer.UserName,targetCustomer.Id,UserTypes.CustomerType,
                CustomerStatics.DefaultCustomerClaim("",targetCustomer.Name,targetCustomer.LastName,targetCustomer.IsPremiumAccount.ToString()));
            return new AccountActivationDTo()
            {
                Success = true,
                Email = targetCustomer.Email,
                UserName = targetCustomer.UserName,
                Token = token
            };
        }
    }
}