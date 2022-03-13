using System.Collections;
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
        [HttpGet("PTodayInProfits")]
        public Task<IEnumerable<TransferProfitDTo>> GetPendingTodayInProfits()
        {
            return Mediator.Send(new GetUnCompleteTodayInTransfersProfitQuery());
        }
        [HttpGet("PTodayOutProfits")]
        public Task<IEnumerable<TransferProfitDTo>> GetPendingTodayOutProfits()
        {
            return Mediator.Send(new GetUnCompleteTodayOutTransfersProfitQuery());
        }
        [HttpGet("transfersStatic")]
        public Task<TransfersStaticsDTo> GetTransfersStatic()
        {
            return Mediator.Send(new GetTransfersStaticsQuery());
        }
    }
}