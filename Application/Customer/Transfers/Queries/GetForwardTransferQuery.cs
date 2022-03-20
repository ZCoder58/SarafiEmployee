using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Transfers.DTOs;
using Application.Customer.Transfers.Extensions;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Transfers.Queries
{
    public record GetForwardTransferQuery(Guid TransferId) : IRequest<ForwardTransferDTo>;

    public class GetForwardTransferHandler:IRequestHandler<GetForwardTransferQuery,ForwardTransferDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _userContext;
        public GetForwardTransferHandler(IApplicationDbContext dbContext, IHttpUserContext userContext)
        {
            _dbContext = dbContext;
            _userContext = userContext;
        }

        public Task<ForwardTransferDTo> Handle(GetForwardTransferQuery request, CancellationToken cancellationToken)
        {
            var targetTransfer = _dbContext.Transfers.Where(a =>
                a.ReceiverId == _userContext.GetCurrentUserId().ToGuid() &&
                a.State == TransfersStatusTypes.InProgress).GetById(request.TransferId);
            if (targetTransfer.IsNull())
            {
                throw new EntityNotFoundException();
            }
            if (_dbContext.Transfers.IsForwarded(targetTransfer.Id))
            {
                throw new CustomException("قبلا ارجاع شده است");
            }
            return Task.FromResult(new ForwardTransferDTo()
            {
                Amount = targetTransfer.DestinationAmount,
                PriceName = targetTransfer.ToCurrency
            });
        }
    }
}