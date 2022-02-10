using System;

namespace Application.Customer.ExchangeRates.DTos
{
    public class ExchangeRatesDTo
    {
        public double ToExchangeRate { get; set; }
        public bool Updated { get; set; }
        public double FromAmount { get; set; }
    }
}