using System;
using MediatR;

namespace Application.Customer.Transfers.Commands.ForwardedDenyTransfer
{
    public record ForwardedDenyTransferCommand(Guid TransferId,bool EnableForwarded=false) : IRequest;
}