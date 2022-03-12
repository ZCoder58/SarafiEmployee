using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Withdrawal;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;

namespace Application.SubCustomers.Commands.Transactions.RollbackTransaction
{
    public class CsRollbackTransactionHandler : IRequestHandler<CsRollbackTransactionCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;
        private readonly IHttpUserContext _httpUserContext;

        public CsRollbackTransactionHandler(IApplicationDbContext dbContext, IMediator mediator, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(CsRollbackTransactionCommand request, CancellationToken cancellationToken)
        {
            var targetTransaction = _dbContext.SubCustomerTransactions.GetById(request.TransactionId);
            var targetSubCustomerAccountRate =
                _dbContext.SubCustomerAccountRates.GetById(targetTransaction.SubCustomerAccountRateId);
            if (targetTransaction.TransactionType == TransactionTypes.Withdrawal ||
                targetTransaction.TransactionType == TransactionTypes.Transfer ||
                targetTransaction.TransactionType == TransactionTypes.TransferWithDebt ||
                targetTransaction.TransactionType == TransactionTypes.WithdrawalWithDebt)
            {
                targetSubCustomerAccountRate.Amount += targetTransaction.Amount;
                if (targetTransaction.AccountTransaction &&
                    (targetTransaction.TransactionType == TransactionTypes.Withdrawal ||
                     targetTransaction.TransactionType == TransactionTypes.WithdrawalWithDebt))
                {
                    await _mediator.Send(new CDepositAccountCommand(
                        true,
                        targetSubCustomerAccountRate.RatesCountryId,
                        targetTransaction.Amount,
                        "",
                        false
                    ), cancellationToken);
                }
            }
            else
            {
                targetSubCustomerAccountRate.Amount -= targetTransaction.Amount;
                if (targetTransaction.AccountTransaction)
                {
                    await _mediator.Send(new CWithdrawalAccountCommand(
                        true,
                        targetSubCustomerAccountRate.RatesCountryId,
                        targetTransaction.Amount,
                        "",
                        false
                    ), cancellationToken);
                }
            }

            _dbContext.SubCustomerTransactions.Remove(targetTransaction);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}