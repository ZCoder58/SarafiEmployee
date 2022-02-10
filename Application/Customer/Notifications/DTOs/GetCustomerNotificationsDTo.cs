using System;
using System.Collections.Generic;

namespace Application.Customer.Notifications.DTOs
{
    public class GetCustomerNotificationsDTo
    {
        public IEnumerable<CustomerNotificationDTo> Notifications { get; set; }
        public int UnseenCount { get; set; }
    }
}