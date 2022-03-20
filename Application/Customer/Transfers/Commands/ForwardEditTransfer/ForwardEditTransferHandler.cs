using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Transfers.EventHandlers;
using Application.Customer.Transfers.Statics;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Transfers.Commands.ForwardEditTransfer
{
    public class ForwardEditTransferHandler : IRequestHandler<ForwardEditTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;

        public ForwardEditTransferHandler(IApplicationDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(ForwardEditTransferCommand request, CancellationToken cancellationToken)
        {
            var targetTransfer = _dbContext.Transfers.GetById(request.Id);
            var targetParentForwardedTransfer =
                _dbContext.Transfers.FirstOrDefault(a => a.Id == targetTransfer.ParentForwardedId);
            var isTheSameReceiver = true;
            if (!request.EnableEditForwarded)
            {
                var receiver = _dbContext.Friends.Include(a => a.Customer)
                    .GetById(request.FriendId.ToGuid());
                 isTheSameReceiver = targetTransfer.ReceiverId == receiver.CustomerFriendId;
                targetTransfer.ReceiverId = receiver.CustomerFriendId;
                
            }
            targetTransfer.FromCurrency = targetParentForwardedTransfer.ToCurrency;
            targetTransfer.ToCurrency = targetParentForwardedTransfer.ToCurrency;
            targetTransfer.SourceAmount = targetParentForwardedTransfer.DestinationAmount;
            targetTransfer.DestinationAmount = targetParentForwardedTransfer.DestinationAmount;
            targetTransfer.SenderId = targetParentForwardedTransfer.ReceiverId.ToGuid();
            targetTransfer.FromRate = 1;
            targetTransfer.ToRate = 1;
            targetTransfer.ReceiverFee = request.ReceiverFee;
            targetTransfer.Comment = request.Comment;
            targetTransfer.CodeNumber = request.CodeNumber;
            if (!isTheSameReceiver)
            {
                if (targetTransfer.Forwarded)
                {
                    var otherForwards = await _dbContext.Transfers
                        .Where(a => a.ForwardedTransferId == targetTransfer.ForwardedTransferId &&
                                    a.ForwardPriority > targetTransfer.ForwardPriority).ToListAsync(cancellationToken);
                    _dbContext.Transfers.RemoveRange(otherForwards);
                    await _dbContext.SaveChangesAsync(cancellationToken);
                    targetTransfer.Forwarded = false;
                }

                await _mediator.Publish(new TransferCreated(targetTransfer.Id),
                    cancellationToken);
            }
            else
            {
                await _mediator.Publish(new TransferEdited(), cancellationToken);
            }

            await _dbContext.SaveChangesAsync(cancellationToken);
            if (targetTransfer.Forwarded)
            {
                var childTransfer = _dbContext.Transfers.FirstOrDefault(a => a.ParentForwardedId == targetTransfer.Id);
                await _mediator.Send(new ForwardEditTransferCommand()
                {
                    Id = childTransfer.Id,
                    Comment = childTransfer.Comment,
                    CodeNumber = childTransfer.CodeNumber,
                    ReceiverFee = childTransfer.ReceiverFee,
                    EnableEditForwarded = true
                }, cancellationToken);
            }

            return Unit.Value;
        }
    }
}