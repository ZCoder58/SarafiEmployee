using System;
using Domain.Common;
using Domain.Interfaces;
namespace Domain.Entities
{
    public class CustomerNotification:BaseEntity,ISeenNotification,
        IReadNotification
    {
        public string Title { get; set; }
        public string Body { get; set; }
        public string Type { get; set; }
        public bool IsSeen { get; set; }
        public bool IsRead { get; set; }
        public Guid BaseId { get; set; }
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}