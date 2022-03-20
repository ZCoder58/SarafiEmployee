using System;
using MediatR;

namespace Application.Customer.Transfers.Commands.SetTransferComplete
{
    public record SetTransferCompleteCommand(Guid TransferId,string Phone,string SId,bool Forwarded=false) : IRequest;
}