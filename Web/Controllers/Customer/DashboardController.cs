﻿using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Customer.Dashboards.DTOs;
using Application.Customer.Dashboards.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.Customer
{
    [Authorize("customerSimple")]
    [Route("api/customer/dashboard")]
    public class DashboardController : ApiBaseController
    {
      
        [HttpGet("todayInProfits")]
        public Task<IEnumerable<TransferProfitDTo>> GetTodayInProfits()
        {
            return Mediator.Send(new GetTodayInTransfersProfitQuery());
        }
        [HttpGet("todayOutProfits")]
        public Task<IEnumerable<TransferProfitDTo>> GetTodayOutProfits()
        {
            return Mediator.Send(new GetTodayOutTransfersProfitQuery());
        }
    }
}