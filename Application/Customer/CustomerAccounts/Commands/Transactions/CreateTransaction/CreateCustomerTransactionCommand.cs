using System;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.Transactions.CreateTransaction
{
    public class CreateCustomerTransactionCommand:IRequest<Guid>
    {
        public double Amount { get; set; }
        public string PriceName { get; set; }
        public int TransactionType { get; set; }
        public string Comment { get; set; }
        public Guid? TransferId { get; set; }
        public Guid CustomerAccountId { get; set; }
        public Guid? ToCustomerAccountId { get; set; }
    }
}
