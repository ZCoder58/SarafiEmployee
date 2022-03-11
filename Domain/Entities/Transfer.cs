﻿using System;
using Domain.Common;

namespace Domain.Entities
{
    public class Transfer:BaseEntity
    {
        public string FromName { get; set; }
        public string FromLastName { get; set; }
        public string FromFatherName { get; set; }
        public string FromPhone { get; set; }
        public string ToName { get; set; }
        public string ToLastName { get; set; }
        public string ToFatherName { get; set; }
        public string ToGrandFatherName { get; set; }
        public string ToPhone { get; set; }
        public string ToSId { get; set; }
        public string FromCurrency { get; set; }
        public string ToCurrency { get; set; }
        public double FromRate { get; set; }
        public double ToRate { get; set; }
        public bool RateUpdated { get; set; }
        public double SourceAmount { get; set; }
        public double DestinationAmount { get; set; }
        public DateTime? CompleteDate { get; set; }
        public int State { get; set; }
        public int CodeNumber { get; set; }
        public double Fee { get; set; }
        public double ReceiverFee { get; set; }
        public string Comment { get; set; }
        public Guid? ReceiverId { get; set; }
        public Customer Receiver { get; set; }
        public string ExchangeType { get; set; }
        public Guid SenderId { get; set; }
        public Customer Sender { get; set; }
        public int AccountType { get; set; }
        public Guid? SubCustomerAccountId { get; set; }
        public SubCustomerAccount SubCustomerAccount { get; set; }
    }
}