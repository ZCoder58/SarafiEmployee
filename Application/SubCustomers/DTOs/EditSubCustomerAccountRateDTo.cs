using System;

namespace Application.SubCustomers.DTOs
{
    public class EditSubCustomerAccountRateDTo
    {
        public Guid SubCustomerAccountId { get; set; }
        public double Amount { get; set; }
        public Guid RatesCountryId { get; set; }
    }
}