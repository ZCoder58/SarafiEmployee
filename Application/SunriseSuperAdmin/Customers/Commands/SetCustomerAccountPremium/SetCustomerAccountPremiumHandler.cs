using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using MediatR;

namespace Application.SunriseSuperAdmin.Customers.Commands.SetCustomerAccountPremium
{
    public class SetCustomerAccountPremiumHandler:IRequestHandler<SetCustomerAccountPremiumCommand,bool>
    {
        private readonly IApplicationDbContext _dbContext;

        public SetCustomerAccountPremiumHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> Handle(SetCustomerAccountPremiumCommand request, CancellationToken cancellationToken)
        {
            var targetCustomer = _dbContext.Customers.GetById(request.Id);
            targetCustomer.IsPremiumAccount = true;
            await _dbContext.SaveChangesAsync(cancellationToken);
            return targetCustomer.IsPremiumAccount;
        }
    }
}