using System;
namespace Application.Customer.Transfers.DTOs
{
    public class ForwardEditTransferDTo
    {
        public Guid Id { get; set; }
        public string PriceName { get; set; }
        public double Amount { get; set; }
        public double ReceiverFee { get; set; } = 0;
        public int CodeNumber { get; set; }
        public Guid FriendId { get; set; }
        public string Comment { get; set; }
    }
}