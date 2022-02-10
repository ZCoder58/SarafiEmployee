using System;
using MediatR;

namespace Application.Customer.ExchangeRates.Commands.UpdateExchangeRate
{
    public record UpdateExchangeRateCommand(Guid ExchangeRateId,double FromAmount,double ToExchangeRate) : IRequest;
}