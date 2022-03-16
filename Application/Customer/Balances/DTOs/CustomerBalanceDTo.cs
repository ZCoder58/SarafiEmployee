using System;

namespace Application.Customer.Balances.DTOs
{
    public class CustomerBalanceDTo
    {
        public Guid Id { get; set; }
        public string Amount { get; set; }
        public string RatesCountryPriceName { get; set; }
    }
}