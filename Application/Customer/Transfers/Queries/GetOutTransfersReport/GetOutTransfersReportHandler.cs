using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Transfers.DTOs;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Transfers.Queries.GetOutTransfersReport
{
    public class
        GetOutTransfersReportHandler : IRequestHandler<GetOutTransfersReportQuery, List<TransferOutReportDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;

        public GetOutTransfersReportHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public Task<List<TransferOutReportDTo>> Handle(GetOutTransfersReportQuery request,
            CancellationToken cancellationToken)
        {
            if (request.FriendId.IsNotEmptyGuid())
            {
                var targetFriend = _dbContext.Friends.GetById(request.FriendId);
                var inReportFriend= _dbContext.Transfers
                    .Where(a =>
                        a.ReceiverId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                        a.CreatedDate.Value.Date >= request.FromDate.Date &&
                        a.SenderId == targetFriend.CustomerFriendId.ToGuid() &&
                        a.State==TransfersStatusTypes.Completed&&
                        a.CreatedDate.Value.Date <= request.ToDate.Date).ToList()
                    .GroupBy(a => a.ToCurrency)
                    .Select(a => new TransferOutReportDTo()
                    {
                        CurrencyName = a.Key,
                        TotalAmount = a.Sum(b => b.DestinationAmount).ToString(),
                        TotalTransfers = a.Count(),
                    }).ToList();
                return Task.FromResult(inReportFriend);
            }

            var inReportGlobal= _dbContext.Transfers
                .Where(a =>
                    a.ReceiverId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.CreatedDate.Value.Date >= request.FromDate.Date &&
                    a.State==TransfersStatusTypes.Completed&&
                    a.CreatedDate.Value.Date <= request.ToDate.Date).ToList()
                .GroupBy(a => a.ToCurrency)
                .Select(a => new TransferOutReportDTo()
                {
                    CurrencyName = a.Key,
                    TotalAmount = a.Sum(b => b.DestinationAmount).ToString(),
                    TotalTransfers = a.Count(),
                }).ToList();
            return Task.FromResult(inReportGlobal);
        }
    }
}