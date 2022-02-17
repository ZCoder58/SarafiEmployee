using System.Threading.Tasks;
using Application.Customer.Notifications.Commands.CustomerSetNotificationsSeen;
using Application.Customer.Notifications.DTOs;
using Application.Customer.Notifications.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.Customer
{
    [Authorize("customerSimple")]
    [Route("api/customer/notifications")]
    public class NotificationsController : ApiBaseController
    {
        [HttpGet("limit")]
        public Task<GetCustomerNotificationsDTo> GetNotificationsLimit()
        {
            return Mediator.Send(new GetCustomerNotificationsQuery());
        }
        [HttpGet("seen")]
        public Task SetNotificationsSeen()
        {
            return Mediator.Send(new CustomerSetNotificationsSeenCommand());
        }
    }
}