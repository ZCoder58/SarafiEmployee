using System;
using Domain.Common;

namespace Domain.Entities
{
    public class CustomerBalanceTransaction:BaseEntity
    {
        public string Comment { get; set; }
        public int Type { get; set; }
        public double Amount { get; set; }
        public string PriceName { get; set; }
        public Guid? TransferId { get; set; }
        public Guid CustomerBalanceId { get; set; }
        public CustomerBalance CustomerBalance { get; set; }
        public Transfer Transfer { get; set; }
    }
}