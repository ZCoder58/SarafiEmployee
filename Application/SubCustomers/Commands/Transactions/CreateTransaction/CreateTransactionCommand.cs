using System;
using MediatR;

namespace Application.SubCustomers.Commands.Transactions.CreateTransaction
{
    public class CreateTransactionCommand:IRequest
    {
        public Guid? ToSubCustomerAccountRateId { get; set; }
        public Guid SubCustomerAccountRateId { get; set; }
        public double Amount { get; set; }
        public string Comment { get; set; }
        public string PriceName { get; set; }
        public int TransactionType { get; set; }
        public Guid? TransferId { get; set; }
        
    }
}
