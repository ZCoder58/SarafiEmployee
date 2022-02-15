using System;

namespace Application.Customer.Notifications.DTOs
{
    public class CustomerNotificationDTo
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Type { get; set; }
        public bool IsSeen { get; set; }
        public bool IsRead { get; set; }
        public Guid BaseId { get; set; }
    }
}