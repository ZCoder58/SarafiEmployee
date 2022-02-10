using System;

namespace Application.Customer.ExchangeRates.DTos
{
    public class CustomerExchangeRateEditDTo
    {
        public Guid Id { get; set; }
        public string FromRatesCountryPriceName { get; set; }
        public string FromRatesCountryFaName { get; set; }
        public double FromAmount { get; set; }
        public string FromRatesCountryFlagPhoto { get; set; }
        public string ToRatesCountryPriceName{ get; set; }
        public double ToExchangeRate { get; set; }
    }
}