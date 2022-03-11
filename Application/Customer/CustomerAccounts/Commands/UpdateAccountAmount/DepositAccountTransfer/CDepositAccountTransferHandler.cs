using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.CustomerAccounts.Commands.CreateAccountRate;
using Application.Customer.CustomerAccounts.Commands.Transactions.CreateTransaction;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit;
using Application.Customer.CustomerAccounts.Extensions;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.DepositAccountTransfer
{
    public class CDepositAccountTransferHandler : IRequestHandler<CDepositAccountTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;
        private readonly IHttpUserContext _httpUserContext;
        public CDepositAccountTransferHandler(IApplicationDbContext dbContext, IMediator mediator, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(CDepositAccountTransferCommand request, CancellationToken cancellationToken)
        {
            var customerId = request.IsMyAccount ? _httpUserContext.GetCurrentUserId().ToGuid() : request.CustomerId.ToGuid();

            var targetCustomerAccount = _dbContext.CustomerAccounts
                .Include(a => a.RatesCountry)
                .GetByCountryRateId(request.RateCountryId,customerId);
            if (targetCustomerAccount.IsNull())
            {
                await _mediator.Send(new CCreateAccountRateCommand()
                {
                    Amount = request.Amount,
                    RatesCountryId = request.RateCountryId
                }, cancellationToken);
                targetCustomerAccount = _dbContext.CustomerAccounts
                    .Include(a => a.RatesCountry)
                    .GetByCountryRateId(request.RateCountryId,customerId);
            }
            else
            {
                targetCustomerAccount.Amount += request.Amount;
                await _dbContext.SaveChangesAsync(cancellationToken);
            }

            if (request.EnableTransaction)
            {
                await _mediator.Send(new CCreateTransactionCommand()
                {
                    Amount = request.Amount,
                    Comment = request.Comment,
                    PriceName = targetCustomerAccount.RatesCountry.PriceName,
                    TransactionType = TransactionTypes.Transfer,
                    CustomerAccountId = targetCustomerAccount.Id,
                    EnableRollback = false,
                    TransferId = request.TransferId
                }, cancellationToken);
            }

            return Unit.Value;
        }
    }
}