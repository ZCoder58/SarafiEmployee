using System;
using Application.Common.Models;
using MediatR;

namespace Application.Customer.Friend.DTOs
{
    public class FriendRequestDTo
    {
        public Guid CustomerId { get; set; }
        public Guid CustomerFriendId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerLastName { get; set; }
        public string CustomerPhoto { get; set; }
        public string CustomerCity { get; set; }
        public string CustomerDetailedAddress { get; set; }
        public string CustomerCountryName { get; set; }
        public int State { get; set; }
    }
}