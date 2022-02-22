using System;
using MediatR;

namespace Application.SubCustomers.Commands.RollbackTransaction
{
    public record RollbackTransactionCommand(Guid TransactionId) : IRequest;
}