using System;
using MediatR;

namespace Application.Customer.Transfers.Commands.ForwardTransfer
{
    public class ForwardTransferCommand:IRequest
    {
        public Guid TransferId { get; set; }
        public int CodeNumber { get; set; }
        public Guid FriendId { get; set; }
        public string Comment { get; set; }
        public double ReceiverFee { get; set; }
    }
}