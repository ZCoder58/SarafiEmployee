using System;
using MediatR;

namespace Application.Customer.Transfers.Commands.DenyTransfer
{
    public record DenyTransferCommand(Guid TransferId) : IRequest;
}