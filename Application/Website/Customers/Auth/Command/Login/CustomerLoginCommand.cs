using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Models;
using Application.Common.Security;
using Application.Common.Statics;
using Domain.Interfaces;
using MediatR;

namespace Application.Website.Customers.Auth.Command.Login
{
    public record CustomerLoginCommand(string UserName, string Password) : IRequest<AuthResult>;

    public class CustomerLoginCommandHandler : IRequestHandler<CustomerLoginCommand, AuthResult>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly JwtService _jwtOptions;

        public CustomerLoginCommandHandler(IApplicationDbContext dbContext, JwtService jwtOptions)
        {
            _dbContext = dbContext;
            _jwtOptions = jwtOptions;
        }

        public Task<AuthResult> Handle(CustomerLoginCommand request, CancellationToken cancellationToken)
        {
            var targetUser = _dbContext.Customers.GetUser(request.UserName, request.Password);
            string token = "";
            if (targetUser.UserType == UserTypes.CompanyType)
            {
                token = _jwtOptions.GenerateToken(targetUser.UserName,targetUser.Id,targetUser.UserType,
                    CustomerStatics.DefaultCompanyClaim(targetUser.CompanyId.ToGuid(),targetUser.Photo,targetUser.Name,targetUser.LastName));
            }
            else
            {
                token = _jwtOptions.GenerateToken(targetUser.UserName,targetUser.Id,targetUser.UserType,
                    CustomerStatics.DefaultCustomerClaim(targetUser.Photo,targetUser.Name,targetUser.LastName,targetUser.IsPremiumAccount.ToString()));
            }
            return Task.FromResult(new AuthResult()
            {
                Token = token
            });
        }
    }
}