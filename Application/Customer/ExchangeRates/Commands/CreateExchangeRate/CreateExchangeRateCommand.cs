using System;
using Domain.Entities;
using MediatR;

namespace Application.Customer.ExchangeRates.Commands.CreateExchangeRate
{
    public record CreateExchangeRateCommand(
        Guid FromCurrency, 
        Guid ToCurrency,
        double FromAmount,
        double ToAmount,
        bool Updated=true) : IRequest<CustomerExchangeRate>;
}