using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.ExchangeRates.Extensions;
using Application.SubCustomers.Commands.Transactions.CreateTransaction;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.UpdateAccountAmount.TransferToAccount
{
    public class TransferToAmountHandler : IRequestHandler<TransferToAccountCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMediator _mediator;

        public TransferToAmountHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext,
            IMediator mediator)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(TransferToAccountCommand request, CancellationToken cancellationToken)
        {
            var targetSubCustomerAccountRate = _dbContext.SubCustomerAccountRates
                .Include(a => a.RatesCountry)
                .Include(a => a.SubCustomerAccount)
                .GetById(request.SubCustomerAccountRateId);
            var targetToSubCustomerAccountRate = _dbContext.SubCustomerAccountRates
                .Include(a => a.RatesCountry)
                .GetById(request.ToSubCustomerAccountRateId);

            //update subCustomerAccount amount 
            targetSubCustomerAccountRate.Amount -= request.Amount;
            //update toSubCustomerAccount amount
            var exchangeRateAmount = _dbContext.CustomerExchangeRates.ConvertCurrencyById(
                _httpUserContext.GetCurrentUserId().ToGuid(),
                targetSubCustomerAccountRate.RatesCountryId,
                targetToSubCustomerAccountRate.RatesCountryId,
                request.Amount);
            targetToSubCustomerAccountRate.Amount += exchangeRateAmount;
            await _dbContext.SaveChangesAsync(cancellationToken);
            //add sender transaction
            await _mediator.Send(new CreateTransactionCommand()
            {
                Amount = request.Amount,
                Comment = request.Comment,
                PriceName = targetSubCustomerAccountRate.RatesCountry.PriceName,
                TransactionType = SubCustomerTransactionTypes.TransferToAccount,
                SubCustomerAccountRateId = request.SubCustomerAccountRateId
            }, cancellationToken);
            // add receiver transaction
            await _mediator.Send(new CreateTransactionCommand()
            {
                Amount = exchangeRateAmount,
                Comment = string.Concat(
                    exchangeRateAmount,
                    " ",
                    targetSubCustomerAccountRate.RatesCountry.PriceName,
                    " از طرف ",
                    targetSubCustomerAccountRate.SubCustomerAccount.Name,
                    " ولد ",
                    targetSubCustomerAccountRate.SubCustomerAccount.FatherName,
                    " به این اکانت انتقال داده شد"),
                PriceName = targetToSubCustomerAccountRate.RatesCountry.PriceName,
                TransactionType = SubCustomerTransactionTypes.ReceivedFromAccount,
                SubCustomerAccountRateId = request.ToSubCustomerAccountRateId
            }, cancellationToken);
            return Unit.Value;
        }
    }
}