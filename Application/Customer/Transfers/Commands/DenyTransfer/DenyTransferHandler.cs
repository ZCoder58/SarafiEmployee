using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Transfers.EventHandlers;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Transfers.Commands.DenyTransfer
{
    public class DenyTransferHandler:IRequestHandler<DenyTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;
        public DenyTransferHandler(IApplicationDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(DenyTransferCommand request, CancellationToken cancellationToken)
        {
            var targetTransfer = _dbContext.Transfers.GetById(request.TransferId);
            targetTransfer.State = TransfersStatusTypes.Denied;
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new TransferDenied(targetTransfer.SenderId,targetTransfer.Id), cancellationToken);
            return Unit.Value;
        }
    }
}