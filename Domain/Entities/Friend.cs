using System;
using Domain.Common;

namespace Domain.Entities
{
    public class Friend:BaseEntity
    {
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }
        public Guid? CustomerFriendId { get; set; }
        public Customer CustomerFriend { get; set; }
        public int State { get; set; }
        public bool CustomerFriendApproved { get; set; }
    }
}