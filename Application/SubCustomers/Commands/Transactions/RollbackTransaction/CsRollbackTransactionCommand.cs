using System;
using MediatR;

namespace Application.SubCustomers.Commands.Transactions.RollbackTransaction
{
    public record CsRollbackTransactionCommand(Guid TransactionId,bool AllowTransferRollback) : IRequest;
}