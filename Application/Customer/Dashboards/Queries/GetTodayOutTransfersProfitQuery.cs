using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Statics;
using Application.Customer.Dashboards.DTOs;
using Application.Customer.Transfers.DTOs;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Dashboards.Queries
{
    public record GetTodayOutTransfersProfitQuery : IRequest<IEnumerable<TransferProfitDTo>>;

    public class GetTodayOutTransfersProfitHandler:IRequestHandler<GetTodayOutTransfersProfitQuery,IEnumerable<TransferProfitDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;

        public GetTodayOutTransfersProfitHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public async Task<IEnumerable<TransferProfitDTo>> Handle(GetTodayOutTransfersProfitQuery request, CancellationToken cancellationToken)
        {
            var inReportGlobalProfit= _dbContext.Transfers
                .Where(a =>
                    a.ReceiverId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.CompleteDate.Value.Date ==DateTime.UtcNow.Date &&
                    a.State==TransfersStatusTypes.Completed).ToList()
                .GroupBy(a => a.ToCurrency)
                .Select(a => new TransferProfitDTo()
                {
                    CurrencyName = a.Key,
                    TotalTransfer = a.Count(),
                    TotalProfit = a.Sum(b=>b.ReceiverFee).ToString()
                }).ToList();
            return await Task.FromResult(inReportGlobalProfit);
        }
    }
}