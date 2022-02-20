using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.SubCustomers.Statics;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.UpdateAmount
{
    public class UpdateSubCustomerAmountHandler : IRequestHandler<UpdateSubCustomerAmountCommand>
    {
        private readonly IApplicationDbContext _dbContext;

        public UpdateSubCustomerAmountHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(UpdateSubCustomerAmountCommand request, CancellationToken cancellationToken)
        {
            var targetSubCustomer = _dbContext.SubCustomerAccounts
                .Include(a=>a.RatesCountry)
                .GetById(request.Id);
            if (request.Type == SubCustomerTransactionTypes.Withdrawal)
            {
                targetSubCustomer.Amount -= request.Amount;
            }
            else
            {
                targetSubCustomer.Amount += request.Amount;
            }
            await _dbContext.SubCustomerTransactions.AddAsync(new SubCustomerTransaction()
            {
                SubCustomerAccountId = targetSubCustomer.Id,
                Amount = request.Amount,
                Comment = request.Comment,
                PriceName = targetSubCustomer.RatesCountry.PriceName,
                TransactionType = request.Type
            }, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}