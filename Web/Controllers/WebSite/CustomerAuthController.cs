using System;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.Website.Customers.Auth.Command.Login;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.WebSite
{
    [Route("api/[controller]/[action]")]
    public class CustomerAuthController : ApiBaseController
    {
        [HttpPost]
        public Task<AuthResult> SignIn([FromForm]CustomerLoginCommand request)
        {
            return Mediator.Send(request);
        }

    }
}