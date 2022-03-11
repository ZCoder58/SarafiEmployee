using System;
using System.Collections.Generic;
using Application.Customer.Transfers.DTOs;
using MediatR;

namespace Application.Customer.Transfers.Queries.GetUnCompletedTransfersBills
{
    public record GetUnCompletedTransfersBillsQuery(DateTime FromDate, DateTime ToDate, Guid FriendId) : IRequest<List<TransfersBillsDTo>>;
}