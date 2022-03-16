using System;
using Domain.Common;

namespace Domain.Entities
{
    public class CustomerBalance:BaseEntity
    {
        public double Amount { get; set; }
        public Guid RatesCountryId { get; set; }
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }
        public Guid? CustomerFriendId { get; set; }
        public Customer CustomerFriend { get; set; }
        public RatesCountry RatesCountry { get; set; }
    }
}