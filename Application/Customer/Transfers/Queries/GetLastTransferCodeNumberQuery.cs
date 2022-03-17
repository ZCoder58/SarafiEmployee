using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Transfers.Extensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Transfers.Queries
{
    public record GetLastTransferCodeNumberQuery(Guid ReceiverId) : IRequest<int>;

    public class GetLastTransferCodeNumberHandler:IRequestHandler<GetLastTransferCodeNumberQuery,int>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _userContext;
        public GetLastTransferCodeNumberHandler(IApplicationDbContext dbContext, IHttpUserContext userContext)
        {
            _dbContext = dbContext;
            _userContext = userContext;
        }

        public Task<int> Handle(GetLastTransferCodeNumberQuery request, CancellationToken cancellationToken)
        {
            return Task.FromResult(_dbContext.Transfers.LastCodeNumber(
                _userContext.GetCurrentUserId()
                .ToGuid(),request.ReceiverId));
        }
    }
}