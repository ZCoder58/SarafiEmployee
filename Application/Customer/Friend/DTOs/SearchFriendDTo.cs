using System;

namespace Application.Customer.Friend.DTOs
{
    public class SearchFriendDTo
    {
        public Guid Id { get; set; }
        public string CustomerFriendId{ get; set; }
        public string CustomerFriendName { get; set; }
        public string CustomerFriendLastName { get; set; }
        public string CustomerFriendFatherName { get; set; }
        public string CustomerFriendPhoto { get; set; }
        public string CustomerFriendCity { get; set; }
        public string CustomerFriendDetailedAddress { get; set; }
        public string CustomerFriendCountryName { get; set; }
    }
}