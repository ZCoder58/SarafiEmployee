using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Transfers.DTOs;
using AutoMapper;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Transfers.Queries.GetInTransfersReport
{
    public class
        GetInTransfersReportHandler : IRequestHandler<GetInTransfersReportQuery, List<TransferInReportDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;

        public GetInTransfersReportHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public Task<List<TransferInReportDTo>> Handle(GetInTransfersReportQuery request,
            CancellationToken cancellationToken)
        {
            if (request.FriendId.IsNotEmptyGuid())
            {
                var targetFriend = _dbContext.Friends.GetById(request.FriendId);
                var inReportFriend= _dbContext.Transfers
                    .Where(a =>
                        a.SenderId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                        a.CreatedDate.Value.Date >= request.FromDate.Date &&
                        a.ReceiverId == targetFriend.CustomerFriendId.ToGuid() &&
                        a.State==TransfersStatusTypes.Completed&&
                        a.CreatedDate.Value.Date <= request.ToDate.Date).ToList()
                    .GroupBy(a => a.FromCurrency)
                    .Select(a => new TransferInReportDTo()
                    {
                        CurrencyName = a.Key,
                        TotalAmount = a.Sum(b => b.SourceAmount).ToString(),
                        TotalTransfers = a.Count(),
                        TotalFee = a.Sum(b=>b.Fee)
                    }).ToList();
                return Task.FromResult(inReportFriend);
            }

            var inReportGlobal= _dbContext.Transfers
                .Where(a =>
                    a.SenderId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.CreatedDate.Value.Date >= request.FromDate.Date &&
                    a.State==TransfersStatusTypes.Completed&&
                    a.CreatedDate.Value.Date <= request.ToDate.Date).ToList()
                .GroupBy(a => a.FromCurrency)
                .Select(a => new TransferInReportDTo()
                {
                    CurrencyName = a.Key,
                    TotalAmount = a.Sum(b => b.SourceAmount).ToString(),
                    TotalTransfers = a.Count(),
                    TotalFee = a.Sum(b=>b.Fee)
                }).ToList();
            return Task.FromResult(inReportGlobal);
        }
    }
}