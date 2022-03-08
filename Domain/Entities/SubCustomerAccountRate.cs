using System;
using System.Collections.Generic;
using Domain.Common;

namespace Domain.Entities
{
    public class SubCustomerAccountRate:BaseEntity
    {
        public SubCustomerAccountRate()
        {
            SubCustomerTransactions = new List<SubCustomerTransaction>();
        }
        public double Amount { get; set; }
        public Guid SubCustomerAccountId { get; set; }
        public SubCustomerAccount SubCustomerAccount { get; set; } 
        public Guid RatesCountryId { get; set; }
        public RatesCountry RatesCountry { get; set; }
        public List<SubCustomerTransaction> SubCustomerTransactions { get; set; }
    }
}