using System;
using Domain.Common;

namespace Domain.Entities
{
    public class SubCustomerTransaction:BaseEntity
    {
        public double Amount { get; set; }
        public string PriceName { get; set; }
        public int TransactionType { get; set; }
        public string Comment { get; set; }
        public Guid SubCustomerAccountRateId { get; set; }
        public SubCustomerAccountRate SubCustomerAccountRate { get; set; }
    }
}