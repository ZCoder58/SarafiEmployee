using System;

namespace Application.Customer.CustomerAccounts.DTOs
{
    public class EditCustomerAccountRateDTo
    {
        public Guid Id { get; set; }
        public double Amount { get; set; }
        public Guid RatesCountryId { get; set; }
    }
}