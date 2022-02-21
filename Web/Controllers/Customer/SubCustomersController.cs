using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.SubCustomers.Commands.CreateAccountRate;
using Application.SubCustomers.Commands.CreateSubCustomerAccount;
using Application.SubCustomers.Commands.EditSubCustomerAccount;
using Application.SubCustomers.Commands.UpdateAmount;
using Application.SubCustomers.DTOs;
using Application.SubCustomers.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.Customer
{
    [Authorize("customerSimple")]
    [Route("api/subCustomers")]
    public class SubCustomersController:ApiBaseController
    {
        [HttpGet]
        public Task<PaginatedList<SubCustomerTableDTo>> SubCustomersTable(int page,int perPage,string column,string direction,string search)
        {
            return Mediator.Send(new GetSubCustomerAccountsTableQuery(new TableFilterModel()
            {
                Page = page,
                PerPage = perPage,
                Column = column,
                Direction = direction,
                Search = search
            }));
        }
        
        [HttpPost]
        public Task CreateSubCustomer([FromForm] CreateSubCustomerCommand request)
        {
            return Mediator.Send(request);
        }
        [HttpGet("edit/{id}")]
        public Task<SubCustomerEditDTo> GetForEdit(Guid id)
        {
            return Mediator.Send(new GetSubCustomerAccountEditQuery(id));
        }
        [HttpPut]
        public Task UpdateSubCustomer([FromForm] EditSubCustomerCommand request)
        {
            return Mediator.Send(request);
        }
        [HttpPut("updateAmount")]
        public Task UpdateAmount([FromForm] UpdateSubCustomerAmountCommand request)
        {
            return Mediator.Send(request);
        }
        [HttpGet("transactions")]
        public Task<IEnumerable<SubCustomerTransactionDTo>> GetFilteredTransactions(Guid subCustomerId,DateTime fromDate,DateTime toDate)
        {
            return Mediator.Send(new GetSubCustomerTransactionsFilterListQuery(
                subCustomerId,
                fromDate,
                toDate));
        }
        [HttpGet("{id}")]
        public Task<SubCustomerAccountDTo> GetSubCustomer(Guid id)
        {
            return Mediator.Send(new GetSubCustomerAccountQuery(id));
        }
        [HttpGet("list")]
        public Task<IEnumerable<SubCustomerAccountDropdownListDTo>> GetSubCustomerList()
        {
            return Mediator.Send(new GetSubCustomersListDropdownQuery());
        }
        [HttpGet("accounts")]
        public Task<IEnumerable<SubCustomerAccountRatesTableDTo>> GetSubCustomerAccountsRate(Guid id)
        {
            return Mediator.Send(new GetSubCustomerAccountsRatesQuery(id));
        }
        [HttpPost("accounts")]
        public Task CreateSubCustomerAccountRate([FromForm] CreateAccountRateCommand request)
        {
            return Mediator.Send(request);
        }
        
    }
}