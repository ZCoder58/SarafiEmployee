using System;

namespace Application.Customer.Transfers.DTOs
{
    public class TransferOutboxDetailDTo
    {
        public Guid Id { get; set; }
        public string FromName { get; set; }
        public string FromLastName { get; set; }
        public string FromPhone { get; set; }

        public string ToName { get; set; }
        public string ToLastName { get; set; }
        public string ToPhone { get; set; }
        public string ToSId { get; set; }
        
        public string FromCurrency { get; set; }
        public string ToCurrency { get; set; }

        // public double ToRate { get; set; }
        public double SourceAmount { get; set; }
        public double DestinationAmount { get; set; }

        public int State { get; set; }
        public int CodeNumber { get; set; }
        public double Fee { get; set; }
        public string ReceiverName { get; set; }
        public string ReceiverLastName { get; set; }
        public string ReceiverCity { get; set; }
        public string ReceiverDetailedAddress { get; set; }
        public string ReceiverCountryName { get; set; }
    }
}