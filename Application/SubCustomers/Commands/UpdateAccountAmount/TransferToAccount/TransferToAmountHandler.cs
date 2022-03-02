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
    public class TransferToAmountHandler:IRequestHandler<TransferToAccountCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMediator _mediator;
        public TransferToAmountHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(TransferToAccountCommand request, CancellationToken cancellationToken)
        {
            var targetSubCustomerAccountRate = _dbContext.SubCustomerAccountRates
                .Include(a=>a.RatesCountry)
                .GetById(request.SubCustomerAccountRateId);
            var targetToSubCustomerAccountRate = _dbContext.SubCustomerAccountRates
                .Include(a=>a.RatesCountry)
                .GetById(request.ToSubCustomerAccountRateId);
            var targetExchangeRate = _dbContext.CustomerExchangeRates.GetExchangeRateById(
                _httpUserContext.GetCurrentUserId().ToGuid(),
                targetSubCustomerAccountRate.RatesCountryId,
                targetToSubCustomerAccountRate.RatesCountryId);
            //update subCustomerAccount amount 
            targetSubCustomerAccountRate.Amount -= request.Amount;
           //update toSubCustomerAccount amount
            targetToSubCustomerAccountRate.Amount+= ((request.Amount / targetExchangeRate.FromAmount) * targetExchangeRate.ToExchangeRate).ToString().ToDoubleFormatted();
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Send(new CreateTransactionCommand()
            {
                Amount = request.Amount,
                Comment = request.Comment,
                PriceName = targetSubCustomerAccountRate.RatesCountry.PriceName,
                TransactionType = SubCustomerTransactionTypes.TransferToAccount,
                SubCustomerAccountRateId = request.SubCustomerAccountRateId
            }, cancellationToken);
            return Unit.Value;
        }
    }
}