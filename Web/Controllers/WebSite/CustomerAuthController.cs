using System;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.Website.Customers.Auth.Command.ActivateCustomerAccount;
using Application.Website.Customers.Auth.Command.CreateCustomer;
using Application.Website.Customers.Auth.Command.CreateCustomerCompany;
using Application.Website.Customers.Auth.Command.Login;
using Application.Website.Customers.DTOs;
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
        [HttpPost]
        public Task CustomerSignUp([FromForm]CreateCustomerCommand request)
        {
            return Mediator.Send(request);
        }
        [HttpPost]
        public Task CompanySignUp([FromForm]CreateCustomerCompanyCommand request)
        {
            return Mediator.Send(request);
        }
        [HttpPut]
        public Task<AccountActivationDTo> ActivateAccount(string id)
        {
            return Mediator.Send(new ActivateCustomerAccountCommand(id));
        }
    }
}