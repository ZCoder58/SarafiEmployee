using System;

namespace Application.Customer.Friend.DTOs
{
    public class FriendProfileDTo
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public string Photo { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string City { get; set; }
        public string DetailedAddress { get; set; }
        public string UserName { get; set; }
        public bool IsActive { get; set; }
        public string CountryName { get; set; }
        public int State { get; set; }
        public Guid FId { get; set; }
    }
}