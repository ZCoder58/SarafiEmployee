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

namespace Application.Customer.Transfers.Queries.GetTransferDetailOutbox
{
    public record GetTransferDetailOutboxQuery(Guid TransferId) : IRequest<TransferOutboxDetailDTo>;

    public class GetTransferDetailOutboxHandler:IRequestHandler<GetTransferDetailOutboxQuery,TransferOutboxDetailDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;
        public GetTransferDetailOutboxHandler(IApplicationDbContext dbContext, IMapper mapper, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
        }

        public async Task<TransferOutboxDetailDTo> Handle(GetTransferDetailOutboxQuery request, CancellationToken cancellationToken)
        {
            var targetTransfer= _dbContext.Transfers
                .Include(a=>a.Receiver)
                .ThenInclude(a=>a.Country)
                .Where(a=>a.SenderId==_httpUserContext.GetCurrentUserId().ToGuid())
                .GetById(request.TransferId);
            if (targetTransfer.IsNull())
            {
                throw new EntityNotFoundException();
            }
            return await Task.FromResult(_mapper.Map<TransferOutboxDetailDTo>(targetTransfer));
        }
    }
}