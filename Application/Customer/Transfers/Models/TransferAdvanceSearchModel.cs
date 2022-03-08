using System;

namespace Application.Customer.Transfers.Models
{
    public class TransferAdvanceSearchModel
    {
        public string FromName { get; set; }
        public string FromFatherName { get; set; }
        public string ToName { get; set; }
        public string ToLastName { get; set; }
        public string ToFatherName { get; set; }
        public string FromCurrency { get; set; }
        public string ToCurrency { get; set; }
        public double FromRate { get; set; }
        public double ToRate { get; set; }
        public double SourceAmount { get; set; }
        public double DestinationAmount { get; set; }
        public int State { get; set; }
        public int CodeNumber { get; set; }
        public Guid ReceiverId { get; set; }
        public Guid SenderId { get; set; }
        public int AccountType { get; set; }
        public Guid? SubCustomerAccountId { get; set; }
    }
}