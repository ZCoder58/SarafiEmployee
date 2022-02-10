using System;
using System.Collections.Generic;
using Application.Customer.Transfers.DTOs;
using MediatR;

namespace Application.Customer.Transfers.Queries.GetInTransfersReport
{
    public record GetInTransfersReportQuery(DateTime FromDate, DateTime ToDate, Guid FriendId) : IRequest<List<TransferInReportDTo>>;
}