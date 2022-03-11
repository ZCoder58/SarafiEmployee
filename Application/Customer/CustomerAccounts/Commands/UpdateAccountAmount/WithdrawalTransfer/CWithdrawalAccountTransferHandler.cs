using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Customer.CustomerAccounts.Commands.Transactions.CreateTransaction;
using Application.Customer.CustomerAccounts.Extensions;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.WithdrawalTransfer
{
    public class CWithdrawalAccountTransferHandler : IRequestHandler<CWithdrawalAccountTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;
        private readonly IHttpUserContext _httpUserContext;
        public CWithdrawalAccountTransferHandler(IApplicationDbContext dbContext, IMediator mediator, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(CWithdrawalAccountTransferCommand request,
            CancellationToken cancellationToken)
        {
            var customerId = request.IsMyAccount ? _httpUserContext.GetCurrentUserId().ToGuid() : request.CustomerId.ToGuid();

            var targetCustomerAccountRate = _dbContext.CustomerAccounts
                .Include(a => a.RatesCountry)
                .GetByCountryRateId(request.RateCountryId,customerId);
            
                targetCustomerAccountRate.Amount -= request.Amount;
                await _dbContext.SaveChangesAsync(cancellationToken);

                if (request.EnableTransaction)
                await _mediator.Send(new CCreateTransactionCommand()
                {
                    Amount = request.Amount,
                    Comment = request.Comment,
                    PriceName = targetCustomerAccountRate.RatesCountry.PriceName,
                    TransactionType = TransactionTypes.TransferComplete,
                    CustomerAccountId = targetCustomerAccountRate.Id,
                    TransferId = request.TransferId
                }, cancellationToken);
            return Unit.Value;
        }
    }
}