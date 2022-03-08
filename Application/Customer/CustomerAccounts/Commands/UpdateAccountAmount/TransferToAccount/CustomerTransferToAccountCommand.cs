using System;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.TransferToAccount
{
    public class CustomerTransferToAccountCommand:IRequest
    {
        public Guid CustomerAccountId { get; set; }
        public double Amount { get; set; }
        public string Comment { get; set; }
        public Guid ToCustomerId { get; set; }
        public Guid ToCustomerAccountId { get; set; }
        // public int Type { get; set; }
    }
}