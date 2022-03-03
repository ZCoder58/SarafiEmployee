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
            if (targetTransaction.TransactionType == SubCustomerTransactionTypes.Withdrawal || 
                targetTransaction.TransactionType == SubCustomerTransactionTypes.Transfer ||
                targetTransaction.TransactionType == SubCustomerTransactionTypes.TransferWithDebt ||
                targetTransaction.TransactionType == SubCustomerTransactionTypes.WithdrawalWithDebt ||
                targetTransaction.TransactionType == SubCustomerTransactionTypes.TransferToAccountWithDebt ||
                targetTransaction.TransactionType == SubCustomerTransactionTypes.TransferToAccount)
            {
                targetSubCustomerAccountRate.Amount += targetTransaction.Amount;
                if (targetTransaction.TransactionType == SubCustomerTransactionTypes.TransferToAccountWithDebt ||
                    targetTransaction.TransactionType == SubCustomerTransactionTypes.TransferToAccount)
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