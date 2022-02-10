using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Transfers.DTOs;
using AutoMapper;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Transfers.Queries.GetTransferDetailInbox
{
    public record GetTransferDetailInboxQuery(Guid TransferId) : IRequest<TransferInboxDetailDTo>;

    public class GetTransferDetailInboxHandler:IRequestHandler<GetTransferDetailInboxQuery,TransferInboxDetailDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;
        public GetTransferDetailInboxHandler(IApplicationDbContext dbContext, IMapper mapper, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
        }

        public async Task<TransferInboxDetailDTo> Handle(GetTransferDetailInboxQuery request, CancellationToken cancellationToken)
        {
            var targetTransfer= _dbContext.Transfers
                .Include(a=>a.Sender)
                .ThenInclude(a=>a.Country)
                .Where(a=>a.ReceiverId==_httpUserContext.GetCurrentUserId().ToGuid())
                .GetById(request.TransferId);
            if (targetTransfer.IsNull())
            {
                throw new EntityNotFoundException();
            }
            return await Task.FromResult(_mapper.Map<TransferInboxDetailDTo>(targetTransfer));
        }
    }
}