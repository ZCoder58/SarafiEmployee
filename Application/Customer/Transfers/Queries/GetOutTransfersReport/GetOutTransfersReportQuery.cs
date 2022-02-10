using System;
using System.Collections.Generic;
using Application.Customer.Transfers.DTOs;
using MediatR;

namespace Application.Customer.Transfers.Queries.GetOutTransfersReport
{
    public record GetOutTransfersReportQuery(DateTime FromDate, DateTime ToDate, Guid FriendId) : IRequest<List<TransferOutReportDTo>>;
}