using Application.Customer.ExchangeRates.DTos;
using Domain.Entities;
using MediatR;

namespace Application.Customer.ExchangeRates.Commands.CreateExchangeRate
{
    public record CreateExchangeRateCommand(string AbbrFrom, string AbbrTo) : IRequest<CustomerExchangeRate>;
}