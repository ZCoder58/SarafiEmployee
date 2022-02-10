using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.Customer
{
    [Authorize("customer")]
    [Route("api/dashboard")]
    public class DashboardController : ApiBaseController
    {
      
        // [HttpGet("statics")]
        // public Task<CustomerDashboardStaticsDTo> GetStatics()
        // {
        //     return Mediator.Send(new GetCustomerDashboardStaticsQuery());
        // }
    }
}