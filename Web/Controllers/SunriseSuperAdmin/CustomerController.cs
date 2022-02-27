using System.Threading.Tasks;
using Application.Common.Models;
using Application.SunriseSuperAdmin.Customers.Commands.SetCustomerAccountPremium;
using Application.SunriseSuperAdmin.Customers.DTOs;
using Application.SunriseSuperAdmin.Customers.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.SunriseSuperAdmin
{
    [Authorize("management")]
    [Route("api/management/customers")]
    public class CustomerController : ApiBaseController
    {
        
        public Task<PaginatedList<MCustomerTableDTo>> CustomersTable(int page,int perPage,string column,string direction,string search)
        {
            return Mediator.Send(new MGetCustomersTableQuery(new TableFilterModel()
            {
                Column = column,
                Direction = direction,
                Page = page,
                PerPage = perPage,
                Search = search
            }));
        }
        [HttpPut("setAccountPremium")]
        public Task<bool> SetAccountPremium([FromBody] SetCustomerAccountPremiumCommand request)
        {
            return Mediator.Send(request);
        }
    }
}