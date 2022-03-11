using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Withdrawal;
using Application.SubCustomers.Commands.Transactions.CreateTransaction;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.UpdateAccountAmount.Withdrawal
{
    public class CsWithdrawalAccountHandler : IRequestHandler<CsWithdrawalAccountCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;

        public CsWithdrawalAccountHandler(IApplicationDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(CsWithdrawalAccountCommand request,
            CancellationToken cancellationToken)
        {
            
            var targetSubCustomerAccountRate = _dbContext.SubCustomerAccountRates
                .Include(a => a.RatesCountry)
                .GetById(request.SubCustomerAccountRateId);
            await _mediator.Send(new CWithdrawalAccountCommand(
                true,
                targetSubCustomerAccountRate.RatesCountryId,
                request.Amount,
                "",
                false
            ), cancellationToken);
            
            var transactionType = targetSubCustomerAccountRate.Amount >= request.Amount
                ? TransactionTypes.Withdrawal
                : TransactionTypes.WithdrawalWithDebt;
            //update account amount
            targetSubCustomerAccountRate.Amount -= request.Amount;
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Send(new CsCreateTransactionCommand()
            {
                Amount = request.Amount,
                Comment = request.Comment,
                PriceName = targetSubCustomerAccountRate.RatesCountry.PriceName,
                TransactionType = transactionType,
                SubCustomerAccountRateId = request.SubCustomerAccountRateId
            }, cancellationToken);
          
            return Unit.Value;
        }
    }
}