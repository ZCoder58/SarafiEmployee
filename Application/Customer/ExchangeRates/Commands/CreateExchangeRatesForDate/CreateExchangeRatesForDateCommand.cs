using System;
using System.Collections.Generic;
using Application.Customer.ExchangeRates.DTos;
using MediatR;

namespace Application.Customer.ExchangeRates.Commands.CreateExchangeRatesForDate
{
    public record CreateExchangeRatesForDateCommand(Guid RateCountryId) : IRequest;
}