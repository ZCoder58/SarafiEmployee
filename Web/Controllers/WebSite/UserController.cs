using System;
using System.Threading.Tasks;
using Application.SunriseSuperAdmin.Customers.Queries;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.WebSite
{
    // [Authorize]
    [Route("api/[controller]/[action]")]
    public class CustomerController : ApiBaseController
    {
      
        [HttpGet]
        public Task<bool> AccountActivation(string id)
        {
            Mediator.Send(new SendEmailQuery());
            return Task.FromResult(true);
        }
    }
}