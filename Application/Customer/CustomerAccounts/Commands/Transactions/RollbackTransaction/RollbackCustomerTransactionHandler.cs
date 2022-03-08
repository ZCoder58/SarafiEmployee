using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.SubCustomers.Commands.Transactions.RollbackTransaction;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.Transactions.RollbackTransaction
{
    public class RollbackCustomerTransactionHandler:IRequestHandler<RollbackCustomerTransactionCommand>
    {
        private readonly IApplicationDbContext _dbContext;

        public RollbackCustomerTransactionHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(RollbackCustomerTransactionCommand request, CancellationToken cancellationToken)
        {
            var targetTransaction = _dbContext.CustomerAccountTransactions.GetById(request.TransactionId);
            var targetCustomerAccount = _dbContext.CustomerAccounts.GetById(targetTransaction.CustomerAccountId);
            if (targetTransaction.TransactionType == TransactionTypes.Withdrawal || 
                targetTransaction.TransactionType == TransactionTypes.Transfer ||
                targetTransaction.TransactionType == TransactionTypes.TransferToAccount)
            {
                targetCustomerAccount.Amount += targetTransaction.Amount;
                if (targetTransaction.TransactionType == TransactionTypes.TransferToAccount)
                {
                    var targetToCustomerAccount =
                        _dbContext.CustomerAccounts.GetById(
                            targetTransaction.ToCustomerAccountId.ToGuid());
                    targetToCustomerAccount.Amount -= targetTransaction.Amount;
                }
            }
            else
            {
                targetCustomerAccount.Amount -= targetTransaction.Amount;
            }
            _dbContext.CustomerAccountTransactions.Remove(targetTransaction);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}