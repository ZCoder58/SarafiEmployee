using System;
using MediatR;

namespace Application.Customer.Transfers.Commands.ForwardEditTransfer
{
    public class ForwardEditTransferCommand : IRequest
    {
        public Guid Id { get; set; }
        public double ReceiverFee { get; set; } = 0;
        public string Comment { get; set; }
        public int CodeNumber { get; set; }
        public bool EnableEditForwarded { get; set; } = false;
        public Guid? FriendId { get; set; }
    }
}