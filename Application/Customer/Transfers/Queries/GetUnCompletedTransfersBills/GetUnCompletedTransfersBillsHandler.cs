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

namespace Application.Customer.Transfers.Queries.GetUnCompletedTransfersBills
{
    public class
        GetUnCompletedTransfersBillsQueryHandler : IRequestHandler<GetUnCompletedTransfersBillsQuery, List<TransfersBillsDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;

        public GetUnCompletedTransfersBillsQueryHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public Task<List<TransfersBillsDTo>> Handle(GetUnCompletedTransfersBillsQuery request,
            CancellationToken cancellationToken)
        {
            if (request.FriendId.IsNotEmptyGuid())
            {
                var targetFriend = _dbContext.Friends.GetById(request.FriendId);
                var inReportFriend= _dbContext.Transfers
                    .Where(a =>
                        ((a.ReceiverId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                          a.SenderId == targetFriend.CustomerFriendId.ToGuid())||
                         (a.SenderId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                          a.ReceiverId == targetFriend.CustomerFriendId.ToGuid())) &&
                        a.State==TransfersStatusTypes.InProgress&&
                        a.CreatedDate.Value.Date >= request.FromDate.Date &&
                        a.CreatedDate.Value.Date <= request.ToDate.Date).ToList()
                    .GroupBy(a => a.ToCurrency)
                    .Select(a => new TransfersBillsDTo()
                    {
                        CurrencyName = a.Key,
                        Bedehi = a.Sum(b => 
                            b.SenderId==_httpUserContext.GetCurrentUserId().ToGuid()?
                                b.DestinationAmount+b.ReceiverFee:0
                            ).ToString(),
                        // TotalTransfers = a.Count(),
                        Talab = a.Sum(b=>
                            b.ReceiverId==_httpUserContext.GetCurrentUserId().ToGuid()?
                                b.DestinationAmount+b.ReceiverFee:0
                        ).ToString(),
                        BillResult = (a.Sum(b =>
                            b.ReceiverId == _httpUserContext.GetCurrentUserId().ToGuid()
                                ? b.DestinationAmount + b.ReceiverFee
                                : 0
                        ) - a.Sum(b =>
                            b.SenderId == _httpUserContext.GetCurrentUserId().ToGuid()
                                ? b.DestinationAmount + b.ReceiverFee
                                : 0
                        )).ToString()
                    }).ToList();
                return Task.FromResult(inReportFriend);
            }

            var inReportGlobal= _dbContext.Transfers
                .Where(a =>
                    (a.ReceiverId == _httpUserContext.GetCurrentUserId().ToGuid() ||
                     a.SenderId == _httpUserContext.GetCurrentUserId().ToGuid())&&
                    a.State==TransfersStatusTypes.InProgress&&
                    a.CreatedDate.Value.Date >= request.FromDate.Date &&
                    a.CreatedDate.Value.Date <= request.ToDate.Date).ToList()
                .GroupBy(a => a.ToCurrency)
                .Select(a => new TransfersBillsDTo()
                {
                    CurrencyName = a.Key,
                    Bedehi = a.Sum(b => 
                        b.SenderId==_httpUserContext.GetCurrentUserId().ToGuid()?
                            b.DestinationAmount+b.ReceiverFee:0
                    ).ToString(),
                    // TotalTransfers = a.Count(),
                    Talab = a.Sum(b=>
                        b.ReceiverId==_httpUserContext.GetCurrentUserId().ToGuid()?
                            b.DestinationAmount+b.ReceiverFee:0
                    ).ToString(),
                    BillResult = (a.Sum(b =>
                        b.ReceiverId == _httpUserContext.GetCurrentUserId().ToGuid()
                            ? b.DestinationAmount + b.ReceiverFee
                            : 0
                    ) - a.Sum(b =>
                        b.SenderId == _httpUserContext.GetCurrentUserId().ToGuid()
                            ? b.DestinationAmount + b.ReceiverFee
                            : 0
                    )).ToString()
                }).ToList();;
            return Task.FromResult(inReportGlobal);
        }
    }
}