using System;
using MediatR;

namespace Application.SubCustomers.Commands.Transactions.RollbackTransaction
{
    public record RollbackTransactionCommand(Guid TransactionId) : IRequest;
}