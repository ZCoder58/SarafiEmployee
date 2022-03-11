using System;

namespace Application.Customer.ExchangeRates.DTos
{
    public class ExchangeRatesDTo
    {
        public double ToExchangeRateSell { get; set; }
        public double ToExchangeRateBuy { get; set; }
        public bool Updated { get; set; }
        public double FromAmount { get; set; }
        public bool Reverse { get; set; } = false;
    }
}