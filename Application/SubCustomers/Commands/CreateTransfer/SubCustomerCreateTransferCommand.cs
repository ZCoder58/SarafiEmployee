using System;
using MediatR;

namespace Application.SubCustomers.Commands.CreateTransfer
{
    public class SubCustomerCreateTransferCommand:IRequest
    {
        public string FromName { get; set; }
        public string FromLastName { get; set; }
        public string FromPhone { get; set; }
        public string FromFatherName { get; set; }
        public string ToName { get; set; }
        public string ToLastName { get; set; }
        public string ToFatherName { get; set; }
        public string ToGrandFatherName { get; set; }

        public Guid TCurrency { get; set; }
        public string Comment { get; set; }
        public double Amount { get; set; }
        public double Fee { get; set; } = 0;
        public double ReceiverFee { get; set; } = 0;
        public int CodeNumber { get; set; }
        public Guid FriendId { get; set; }
        public Guid SubCustomerAccountId { get; set; }
        public Guid SubCustomerAccountRateId { get; set; }
        public string ExchangeType { get; set; }
    }
}