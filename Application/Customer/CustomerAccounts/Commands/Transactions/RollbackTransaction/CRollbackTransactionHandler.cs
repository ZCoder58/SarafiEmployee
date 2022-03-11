using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.Transactions.RollbackTransaction
{
    public class CRollbackTransactionHandler:IRequestHandler<CRollbackTransactionCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;
        public CRollbackTransactionHandler(IApplicationDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(CRollbackTransactionCommand request, CancellationToken cancellationToken)
        {
            var targetTransaction = _dbContext.CustomerAccountTransactions.GetById(request.TransactionId);
            var targetCustomerAccount = _dbContext.CustomerAccounts.GetById(targetTransaction.CustomerAccountId);
            if (targetTransaction.TransactionType == TransactionTypes.Withdrawal ||
            targetTransaction.TransactionType == TransactionTypes.TransferComplete
                // || targetTransaction.TransactionType == TransactionTypes.TransferToAccount
                )
            {
                targetCustomerAccount.Amount += targetTransaction.Amount;
                // if (targetTransaction.TransactionType == TransactionTypes.TransferToAccount)
                // {
                //     var targetToCustomerAccount =
                //         _dbContext.CustomerAccounts.GetById(
                //             targetTransaction.ToCustomerAccountId.ToGuid());
                //     targetToCustomerAccount.Amount -= targetTransaction.Amount;
                // }
                
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