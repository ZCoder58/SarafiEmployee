using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Customer.CurrencyByAndSell.EventHandlers;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Withdrawal;
using Application.Customer.ExchangeRates.Extensions;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.CurrencyByAndSell.Commands.CreateMoneyExchange
{
    public class CCreateMoneyExchangeHandler:IRequestHandler<CCreateMoneyExchangeCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMediator _mediator;
        public CCreateMoneyExchangeHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(CCreateMoneyExchangeCommand request, CancellationToken cancellationToken)
        {
            var exchangeAmountResult = _dbContext.CustomerExchangeRates.ConvertCurrencyById(
                _httpUserContext.GetCurrentUserId().ToGuid(),
                request.FromRateCountryId,
                request.ToRateCountryId,
                request.Amount,
                request.ExchangeType
            );
            await _mediator.Send(new CWithdrawalAccountCommand(
                true,
                request.ToRateCountryId,
                exchangeAmountResult,
                "",
                false),cancellationToken);
            await _mediator.Send(new CDepositAccountCommand(
                true,
                request.FromRateCountryId,
                request.Amount,
                "",
                false),cancellationToken);
            await _mediator.Publish(new ExchangeMoneyDoneEvent(),cancellationToken);
            return Unit.Value;
        }
    }
}