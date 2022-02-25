using System;
using MediatR;

namespace Application.SubCustomers.Commands.EditTransfer
{
    public class SubCustomerEditTransferCommand : IRequest
    {
        public Guid Id { get; set; }
        public string FromName { get; set; }
        public string FromLastName { get; set; }
        public string FromPhone { get; set; }

        public string ToName { get; set; }
        public string ToLastName { get; set; }
        public string ToFatherName { get; set; }
        public string ToGrandFatherName { get; set; }

        public Guid TCurrency { get; set; }

        public double Amount { get; set; }
        public double Fee { get; set; } = 0;
        public double ReceiverFee { get; set; } = 0;
        
        public Guid FriendId { get; set; }
        public Guid SubCustomerAccountId { get; set; }
        public Guid SubCustomerAccountRateId { get; set; }
    }
}