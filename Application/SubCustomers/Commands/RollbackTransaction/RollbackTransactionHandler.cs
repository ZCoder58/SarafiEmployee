using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.RollbackTransaction
{
    public class RollbackTransactionHandler:IRequestHandler<RollbackTransactionCommand>
    {
        private readonly IApplicationDbContext _dbContext;

        public RollbackTransactionHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(RollbackTransactionCommand request, CancellationToken cancellationToken)
        {
            var targetTransaction = _dbContext.SubCustomerTransactions.GetById(request.TransactionId);
            var targetAccount = _dbContext.SubCustomerAccountRates.GetById(targetTransaction.SubCustomerAccountRateId);
            if (targetTransaction.TransactionType == SubCustomerTransactionTypes.Withdrawal)
            {
                targetAccount.Amount += targetTransaction.Amount;
            }
            else
            {
                targetAccount.Amount -= targetTransaction.Amount;
            }
            _dbContext.SubCustomerTransactions.Remove(targetTransaction);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}