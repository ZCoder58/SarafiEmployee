using System;
using Domain.Common;

namespace Domain.Entities
{
    public class SubCustomerTransaction:BaseEntity
    {
        public double Amount { get; set; }
        public string PriceName { get; set; }
        public int TransactionType { get; set; }
        /// <summary>
        /// if true amount has dec/inc from customer account
        /// </summary>
        public bool AccountTransaction { get; set; }
        public string Comment { get; set; }
        public Guid? TransferId { get; set; }
        public Transfer Transfer { get; set; }
        public Guid SubCustomerAccountRateId { get; set; }
        public SubCustomerAccountRate SubCustomerAccountRate { get; set; }
        public Guid? ToSubCustomerAccountRateId { get; set; }
        public SubCustomerAccountRate ToSubCustomerAccountRate { get; set; }
    }
}