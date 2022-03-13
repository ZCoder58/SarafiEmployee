using System;
using MediatR;

namespace Application.Customer.CurrencyByAndSell.Commands.CreateMoneyExchange
{
    public class CCreateMoneyExchangeCommand:IRequest
    {
        public double Amount { get; set; }
        public string ExchangeType { get; set; }
        public Guid FromRateCountryId { get; set; }
        public Guid ToRateCountryId { get; set; }
    }
}