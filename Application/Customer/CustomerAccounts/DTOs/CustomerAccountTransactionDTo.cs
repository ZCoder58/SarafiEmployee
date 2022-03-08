using System;

namespace Application.Customer.CustomerAccounts.DTOs
{
    public class CustomerAccountTransactionDTo
    {
        public Guid Id { get; set; }
        public double Amount { get; set; }
        public string PriceName { get; set; }
        public int TransactionType { get; set; }
        public string Comment { get; set; }
        public bool CanRollback { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}