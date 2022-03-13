using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using Domain.Interfaces.IHubs.IAccessors;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.Transactions.RollbackTransaction
{
    public class CRollbackTransactionHandler : IRequestHandler<CRollbackTransactionCommand, bool>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;
        private readonly INotifyHubAccessor _notifyHub;

        public CRollbackTransactionHandler(IApplicationDbContext dbContext, IMediator mediator,
            INotifyHubAccessor notifyHub)
        {
            _dbContext = dbContext;
            _mediator = mediator;
            _notifyHub = notifyHub;
        }

        public async Task<bool> Handle(CRollbackTransactionCommand request, CancellationToken cancellationToken)
        {
            var targetTransaction = _dbContext.CustomerAccountTransactions.GetById(request.TransactionId);
            var targetCustomerAccount = _dbContext.CustomerAccounts.GetById(targetTransaction.CustomerAccountId);
            if (targetTransaction.TransactionType == TransactionTypes.Withdrawal ||
                targetTransaction.TransactionType == TransactionTypes.TransferComplete)
            {
                targetCustomerAccount.Amount += targetTransaction.Amount;
                _dbContext.CustomerAccountTransactions.Remove(targetTransaction);
                await _dbContext.SaveChangesAsync(cancellationToken);
                return true;
            }

            if (targetCustomerAccount.Amount >= targetTransaction.Amount)
            {
                targetCustomerAccount.Amount -= targetTransaction.Amount;
                _dbContext.CustomerAccountTransactions.Remove(targetTransaction);
                return true;
            }

            await _notifyHub.NotifySelfAsync("مقدار پول کافی در دخل وجود ندارد", "error");
            return false;
        }
    }
}