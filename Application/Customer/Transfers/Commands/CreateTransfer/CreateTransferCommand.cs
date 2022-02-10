using System;
using MediatR;

namespace Application.Customer.Transfers.Commands.CreateTransfer
{
    public class CreateTransferCommand:IRequest
    {
        public string FromName { get; set; }
        public string FromLastName { get; set; }
        public string FromPhone { get; set; }

        public string ToName { get; set; }
        public string ToLastName { get; set; }

        public Guid FCurrency { get; set; }
        public Guid TCurrency { get; set; }

        public double Amount { get; set; }
        public double Fee { get; set; }
        
        public int CodeNumber { get; set; }
        public Guid FriendId { get; set; }
    }
}