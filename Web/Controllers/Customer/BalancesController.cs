using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.Customer.Balances.Commands.CreateBalance;
using Application.Customer.Balances.DTOs;
using Application.Customer.Balances.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.Customer
{
    [Authorize("customerSimple")]
    [Route("api/customer/balances")]
    public class BalancesController:ApiBaseController
    {
        public Task<PaginatedList<CustomerBalanceDTo>> GetBalances(int page,int perPage,string column,string direction,Guid friendId)
        {
            return Mediator.Send(new GetCustomerBalancesQuery(new TableFilterModel()
            {
                Column = column,
                Page = page,
                PerPage=perPage,
                Direction = direction
            },friendId));
        }
        [HttpPost]
        public Task CreateBalance([FromForm] CCreateBalanceCommand request)
        {
            return Mediator.Send(request);
        }
        [HttpGet("transactions")]
        public Task<PaginatedList<BalanceTransactionTableDTo>> GetBalancesTransactions(int page,int perPage,string column,string direction,Guid fId)
        {
            return Mediator.Send(new GetBalanceTransactionsQuery(new TableFilterModel()
            {
                Column = column,
                Page = page,
                PerPage=perPage,
                Direction = direction
            },fId));
        }
    }
}