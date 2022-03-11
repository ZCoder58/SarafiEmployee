using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.Customer.CustomerAccounts.Commands.CreateAccountRate;
using Application.Customer.CustomerAccounts.Commands.Deposit;
using Application.Customer.CustomerAccounts.Commands.Transactions.RollbackTransaction;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Withdrawal;
using Application.Customer.CustomerAccounts.Commands.Withdrawal;
using Application.Customer.CustomerAccounts.DTOs;
using Application.Customer.CustomerAccounts.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.Customer
{
    [Authorize("customerSimple")]
    [Route("api/customer/[controller]")]
    public class AccountsController : ApiBaseController
    {
        public Task<PaginatedList<CustomerAccountRateDTo>> AccountsTable(int page,int perPage,string column,string direction)
        {
            return Mediator.Send(new GetCustomerAccountsTableQuery(new TableFilterModel()
            {
                Column = column,
                Page=page,
                PerPage=perPage,
                Direction = direction,
            }));
        }
        [HttpPost]
        public Task<CustomerAccountRateDTo> CreateAccount([FromForm] CCreateAccountRateCommand request)
        {
            return Mediator.Send(request); 
        }
        [HttpPut("withdrawal")]
        public Task WithdrawalAccount([FromForm] CWithdrawalMyAccountCommand request)
        {
            return Mediator.Send(request); 
        }
        [HttpPut("deposit")]
        public Task DepositAccount([FromForm] CDepositMyAccountCommand request)
        {
            return Mediator.Send(request); 
        }
        // [HttpPut("transferToAccount")]
        // public Task TransferToAccount([FromForm] CustomerTransferToAccountCommand request)
        // {
        //     return Mediator.Send(request); 
        // }
        [HttpGet("transactions")]
        public Task<IEnumerable<CustomerAccountTransactionDTo>> GetFilteredTransactions(DateTime fromDate,DateTime toDate)
        {
            return Mediator.Send(new GetCustomerTransactionsFilterListQuery(
                fromDate,
                toDate));
        }
        [HttpPost("transactions/rollback")]
        public Task RollbackTransaction([FromBody]CRollbackTransactionCommand request)
        {
            return Mediator.Send(request);
        }
    }
}