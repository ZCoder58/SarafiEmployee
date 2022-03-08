using System;
using Domain.Entities;
using MediatR;

namespace Application.Customer.ExchangeRates.Commands.CreateExchangeRate
{
    public record CreateExchangeRateCommand(
        Guid FromCurrency, 
        Guid ToCurrency,
        double FromAmount,
        double ToAmountSell,
        double ToAmountBuy,
        bool Updated=true) : IRequest<CustomerExchangeRate>;
}