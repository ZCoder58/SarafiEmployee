﻿using System;

namespace Application.Customer.Transfers.DTOs
{
    public class EditTransferDTo
    {
        public Guid Id { get; set; }
        public string FromName { get; set; }
        public string FromLastName { get; set; }
        public string FromPhone { get; set; }
        public string FromFatherName { get; set; }
        public string ToName { get; set; }
        public string ToLastName { get; set; }
        public string ToFatherName { get; set; }
        public string ToGrandFatherName { get; set; }

        public Guid FCurrency { get; set; }
        public Guid TCurrency { get; set; }

        public double Amount { get; set; }
        public double Fee { get; set; } = 0;
        public double ReceiverFee { get; set; } = 0;
        
        public int CodeNumber { get; set; }
        public Guid FriendId { get; set; }
    }
}