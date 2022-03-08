using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.Transactions.RollbackTransaction
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
            var targetSubCustomerAccountRate = _dbContext.SubCustomerAccountRates.GetById(targetTransaction.SubCustomerAccountRateId);
            if (targetTransaction.TransactionType == TransactionTypes.Withdrawal || 
                targetTransaction.TransactionType == TransactionTypes.Transfer ||
                targetTransaction.TransactionType == TransactionTypes.TransferWithDebt ||
                targetTransaction.TransactionType == TransactionTypes.WithdrawalWithDebt ||
                targetTransaction.TransactionType == TransactionTypes.TransferToAccountWithDebt ||
                targetTransaction.TransactionType == TransactionTypes.TransferToAccount)
            {
                targetSubCustomerAccountRate.Amount += targetTransaction.Amount;
                if (targetTransaction.TransactionType == TransactionTypes.TransferToAccountWithDebt ||
                    targetTransaction.TransactionType == TransactionTypes.TransferToAccount)
                {
                    var targetToSubCustomerAccountRate =
                        _dbContext.SubCustomerAccountRates.GetById(
                            targetTransaction.ToSubCustomerAccountRateId.ToGuid());
                    targetToSubCustomerAccountRate.Amount -= targetTransaction.Amount;
                }
            }
            else
            {
                targetSubCustomerAccountRate.Amount -= targetTransaction.Amount;
            }
            _dbContext.SubCustomerTransactions.Remove(targetTransaction);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}