using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.Customer.Transfers.Commands.CreateTransfer;
using Application.Customer.Transfers.Commands.DenyTransfer;
using Application.Customer.Transfers.Commands.ResendTransfer;
using Application.Customer.Transfers.Commands.SetTransferComplete;
using Application.Customer.Transfers.DTOs;
using Application.Customer.Transfers.Queries;
using Application.Customer.Transfers.Queries.GetInTransfersReport;
using Application.Customer.Transfers.Queries.GetOutTransfersReport;
using Application.Customer.Transfers.Queries.GetTransferDetailInbox;
using Application.Customer.Transfers.Queries.GetTransferDetailOutbox;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.Customer
{
    [Authorize("customerSimple")]
    [Route("api/customer/transfers")]
    public class TransfersController:ApiBaseController
    {
        [HttpGet("inbox")]
        public Task<PaginatedList<TransferInboxTableDTo>> GetInbox(int page, int perPage, string search, string column,
            string direction)
        {
            return Mediator.Send(new GetTransfersInboxTableQuery(new TableFilterModel()
            {
                Page = page,
                PerPage = perPage,
                Column = column,
                Direction = direction,
                Search = search
            }));
        }
        [HttpGet("outbox")]
        public Task<PaginatedList<TransferOutboxTableDTo>> GetOutbox(int page, int perPage, string search, string column,
            string direction)
        {
            return Mediator.Send(new GetTransfersOutboxTableQuery(new TableFilterModel()
            {
                Page = page,
                PerPage = perPage,
                Column = column,
                Direction = direction,
                Search = search
            }));
        }

        [HttpPost]
        public Task CreateTransfer([FromForm] CreateTransferCommand request)
        {
            return Mediator.Send(request);
        }
        [HttpGet("inbox/{id}")]
        public Task<TransferInboxDetailDTo> GetInboxDetailTransfer(Guid id)
        {
            return Mediator.Send(new GetTransferDetailInboxQuery(id));
        }
        [HttpGet("outbox/{id}")]
        public Task<TransferOutboxDetailDTo> GetOutboxDetailTransfer(Guid id)
        {
            return Mediator.Send(new GetTransferDetailOutboxQuery(id));
        }
        [HttpPut("completeTransfer")]
        public Task PassTransfer([FromForm]SetTransferCompleteCommand request)
        {
            return Mediator.Send(request);
        }
        [HttpPut("denyTransfer/{transferId}")]
        public Task DenyTransfer(Guid transferId)
        {
            return Mediator.Send(new DenyTransferCommand(transferId));
        }
        [HttpPut("resendTransfer/{transferId}")]
        public Task ResendTransfer(Guid transferId)
        {
            return Mediator.Send(new ResendTransferCommand(transferId));
        }
        [HttpGet("inReport")]
        public Task<List<TransferInReportDTo>> GetInReport(DateTime fromDate,DateTime toDate,Guid friendId)
        {
            return Mediator.Send(new GetInTransfersReportQuery(fromDate,toDate,friendId));
        }
        [HttpGet("outReport")]
        public Task<List<TransferOutReportDTo>> GetOutReport(DateTime fromDate,DateTime toDate,Guid friendId)
        {
            return Mediator.Send(new GetOutTransfersReportQuery(fromDate,toDate,friendId));
        }
    }
}