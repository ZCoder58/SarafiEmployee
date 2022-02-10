using System;
using MediatR;

namespace Application.Customer.Transfers.Commands.SetTransferComplete
{
    public record SetTransferCompleteCommand(Guid TransferId,string Phone,string SId) : IRequest;
}