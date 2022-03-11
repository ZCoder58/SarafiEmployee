using System;
using Domain.Common;

namespace Domain.Entities
{
    public class CustomerAccountTransaction:BaseEntity
    {
        public double Amount { get; set; }
        
        public string PriceName { get; set; }
        public int TransactionType { get; set; }
        
        public string Comment { get; set; }
        public bool EnableRollback { get; set; }
        public Guid? TransferId { get; set; }
        public Guid CustomerAccountId { get; set; }
        public Guid? ToCustomerAccountId { get; set; }
        
        public CustomerAccount CustomerAccount { get; set; }
        public CustomerAccount ToCustomerAccount { get; set; }
        public Transfer Transfer { get; set; }
    }
}