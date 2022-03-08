using System;

namespace Application.Customer.CustomerAccounts.DTOs
{
    public class CustomerAccountRateDTo
    {
        public Guid Id { get; set; }
        public double Amount { get; set; }
        public string PriceName { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid RatesCountryId { get; set; }
    }
}