using System;
using Domain.Entities;

namespace Application.SubCustomers.DTOs
{
    public class SubCustomerTransactionDTo
    {
        public double Amount { get; set; }
        public string PriceName { get; set; }
        public int TransactionType { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}