using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.CustomerAccounts.Commands.CreateAccountRate;
using Application.Customer.CustomerAccounts.Commands.Transactions.CreateTransaction;
using Application.Customer.CustomerAccounts.Extensions;
using Application.SubCustomers.Commands.Transactions.CreateTransaction;
using Application.SubCustomers.Commands.UpdateAccountAmount.Withdrawal;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Withdrawal
{
    public class CWithdrawalAccountHandler : IRequestHandler<CWithdrawalAccountCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;
        private readonly IHttpUserContext _httpUserContext;
        public CWithdrawalAccountHandler(IApplicationDbContext dbContext, IMediator mediator, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(CWithdrawalAccountCommand request,
            CancellationToken cancellationToken)
        {
            var customerId = request.IsMyAccount ? _httpUserContext.GetCurrentUserId().ToGuid() : request.CustomerId.ToGuid();

            var targetCustomerAccount = _dbContext.CustomerAccounts
                .Include(a => a.RatesCountry)
                .GetByCountryRateId(request.RateCountryId,customerId);
            targetCustomerAccount.Amount -= request.Amount;
            await _dbContext.SaveChangesAsync(cancellationToken);


            if (request.EnableTransaction)
                await _mediator.Send(new CCreateTransactionCommand()
                {
                    Amount = request.Amount,
                    Comment = request.Comment,
                    PriceName = targetCustomerAccount.RatesCountry.PriceName,
                    TransactionType = TransactionTypes.Withdrawal,
                    CustomerAccountId = targetCustomerAccount.Id
                }, cancellationToken);

            return Unit.Value;
        }
    }
}