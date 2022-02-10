using System;
using Domain.Entities;

namespace Application.Customer.Friend.DTOs
{
    public class FriendsListDTo
    {
        public Guid Id { get; set; }
        public Guid CustomerFriendId { get; set; }
        public string CustomerFriendName { get; set; }
        public string CustomerFriendLastName { get; set; }
        public string CustomerFriendPhoto { get; set; }
        public string CustomerFriendCity { get; set; }
        public string CustomerFriendDetailedAddress { get; set; }
        public string CustomerFriendCountryName { get; set; }
    }
}