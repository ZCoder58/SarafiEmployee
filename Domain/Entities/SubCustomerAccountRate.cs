using System;
using Domain.Common;

namespace Domain.Entities
{
    public class SubCustomerAccountRate:BaseEntity
    {
        public double Amount { get; set; }
        public Guid SubCustomerAccountId { get; set; }
        public SubCustomerAccount SubCustomerAccount { get; set; } 
        public Guid RatesCountryId { get; set; }
        public RatesCountry RatesCountry { get; set; }
    }
}