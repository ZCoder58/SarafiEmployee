using System;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.Transactions.RollbackTransaction
{
    public record RollbackCustomerTransactionCommand(Guid TransactionId,bool AllowTransferRollback=false) : IRequest;
}