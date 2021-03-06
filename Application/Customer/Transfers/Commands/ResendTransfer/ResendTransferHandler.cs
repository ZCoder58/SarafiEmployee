using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Transfers.EventHandlers;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Transfers.Commands.ResendTransfer
{
    public class ResendTransferHandler : IRequestHandler<ResendTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;

        public ResendTransferHandler(IApplicationDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(ResendTransferCommand request, CancellationToken cancellationToken)
        {
            var targetTransfer = _dbContext.Transfers.GetById(request.TransferId);
            targetTransfer.State = TransfersStatusTypes.InProgress;
            await _dbContext.SaveChangesAsync(cancellationToken);
            if (targetTransfer.Forwarded)
            {
                var childForwardedTransfer = _dbContext.Transfers.FirstOrDefault(a=>a.ParentForwardedId==targetTransfer.Id);
                await _mediator.Send(new ResendTransferCommand(childForwardedTransfer.Id, true),cancellationToken);
            }
            if (!request.EnableForwarded)
                await _mediator.Publish(new TransferCreated(targetTransfer.Id),
                    cancellationToken);
            return Unit.Value;
        }
    }
}