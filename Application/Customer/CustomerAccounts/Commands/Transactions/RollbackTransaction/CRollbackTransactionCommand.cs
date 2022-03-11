using System;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.Transactions.RollbackTransaction
{
    public record CRollbackTransactionCommand(Guid TransactionId,bool EnableTransferRollback) : IRequest;
}