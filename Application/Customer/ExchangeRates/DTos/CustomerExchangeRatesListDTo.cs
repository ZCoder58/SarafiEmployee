using System;
using Domain.Entities;

namespace Application.Customer.ExchangeRates.DTos
{
    public class CustomerExchangeRatesListDTo
    {
        public Guid Id { get; set; }
        public bool Updated { get; set; }
        public string FromRatesCountryPriceName { get; set; }
        public string FromRatesCountryFaName { get; set; }
        public double FromAmount { get; set; }
        public string FromRatesCountryFlagPhoto { get; set; }
        public double ToExchangeRate { get; set; }
        public string ToRatesCountryPriceName { get; set; }
    }
}