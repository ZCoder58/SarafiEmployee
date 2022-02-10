using System;

namespace Application.Customer.Friend.DTOs
{
    public class SearchOtherCustomerDTo
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Photo { get; set; }
        public string Phone { get; set; }
        public string City { get; set; }
        public string DetailedAddress { get; set; }
        public string CountryName { get; set; }
        public int RequestState { get; set; }
        public Guid RequestId { get; set; }
    }
}