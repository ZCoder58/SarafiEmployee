using System;

namespace Application.SubCustomers.DTOs
{
    public class SubCustomerAccountRatesTableDTo
    {
        public Guid Id { get; set; }
        public double Amount { get; set; }
        public string RatesCountryPriceName { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}