using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Statics;
using Application.Customer.Dashboards.DTOs;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Dashboards.Queries
{
    public record GetUnCompleteTodayInTransfersProfitQuery : IRequest<IEnumerable<TransferProfitDTo>>;

    public class GetUnCompleteTodayInTransfersProfitHandler:IRequestHandler<GetUnCompleteTodayInTransfersProfitQuery,IEnumerable<TransferProfitDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;

        public GetUnCompleteTodayInTransfersProfitHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public async Task<IEnumerable<TransferProfitDTo>> Handle(GetUnCompleteTodayInTransfersProfitQuery request, CancellationToken cancellationToken)
        {
            var inReportGlobalProfit= _dbContext.Transfers
                .Where(a =>
                    a.ReceiverId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.CreatedDate.Value.Date ==CDateTime.Now.Date &&
                    a.State==TransfersStatusTypes.InProgress).ToList()
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