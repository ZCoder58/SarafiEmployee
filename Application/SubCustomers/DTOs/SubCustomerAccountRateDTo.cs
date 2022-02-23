using System;

namespace Application.SubCustomers.DTOs
{
    public class SubCustomerAccountRateDTo
    {
        public Guid Id { get; set; }
        public double Amount { get; set; }
        public string PriceName { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid RatesCountryId { get; set; }
    }
}