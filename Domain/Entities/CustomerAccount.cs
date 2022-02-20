using System;
using Domain.Common;

namespace Domain.Entities
{
    public class CustomerAccount:BaseEntity
    {
        public Guid Amount { get; set; }
        public Guid RatesCountryId { get; set; }
        public RatesCountry RatesCountry { get; set; }
        public Guid CustomerId{ get; set; }
        public Customer Customer{ get; set; }
    }
}