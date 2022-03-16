using System;

namespace Application.Customer.Balances.DTOs
{
    public class BalanceTransactionTableDTo
    {
        public double Amount { get; set; }
        public string Comment { get; set; }
        public string PriceName { get; set; }
        public int Type { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Creator { get; set; }
    }
}