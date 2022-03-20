using System;
using MediatR;

namespace Application.Customer.Transfers.Commands.ResendTransfer
{
    public record ResendTransferCommand(Guid TransferId,bool EnableForwarded=false) : IRequest;
}