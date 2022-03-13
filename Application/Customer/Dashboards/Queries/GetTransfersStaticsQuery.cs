using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Statics;
using Application.Customer.Dashboards.DTOs;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Dashboards.Queries
{
    public class GetTransfersStaticsQuery:IRequest<TransfersStaticsDTo>
    {
        public class GetTransfersStaticsHandler:IRequestHandler<GetTransfersStaticsQuery,TransfersStaticsDTo>
        {
            private readonly IApplicationDbContext _dbContext;
            private readonly IHttpUserContext _httpUserContext;
            public GetTransfersStaticsHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
            {
                _dbContext = dbContext;
                _httpUserContext = httpUserContext;
            }

            public async Task<TransfersStaticsDTo> Handle(GetTransfersStaticsQuery request, CancellationToken cancellationToken)
            {
                var customerId = _httpUserContext.GetCurrentUserId().ToGuid();
                var totalTransfers =await _dbContext.Transfers.Where(a =>
                    a.SenderId == _httpUserContext.GetCurrentUserId().ToGuid() ||
                    a.ReceiverId == _httpUserContext.GetCurrentUserId().ToGuid()).ToListAsync(cancellationToken);
                var totalPendingInTransfers = totalTransfers.Where(a=>a.ReceiverId==customerId).Count(a =>a.State==TransfersStatusTypes.InProgress);
                var totalPendingOutTransfers = totalTransfers.Where(a=>a.SenderId==customerId).Count(a =>a.State==TransfersStatusTypes.InProgress);
                var totalCompletedInTransfers = totalTransfers.Where(a=>a.ReceiverId==customerId).Count(a =>a.State==TransfersStatusTypes.Completed);
                var totalCompletedOutTransfers = totalTransfers.Where(a=>a.SenderId==customerId).Count(a =>a.State==TransfersStatusTypes.Completed);
                return new TransfersStaticsDTo()
                {
                    CompletedInTransfers = totalCompletedInTransfers,
                    CompletedOutTransfers = totalCompletedOutTransfers,
                    PendingInTransfers = totalPendingInTransfers,
                    PendingOutTransfers = totalPendingOutTransfers
                };
            }
        }
    }
}