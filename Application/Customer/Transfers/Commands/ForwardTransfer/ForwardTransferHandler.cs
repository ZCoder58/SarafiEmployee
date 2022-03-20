using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Transfers.EventHandlers;
using Application.Customer.Transfers.Extensions;
using Application.Customer.Transfers.Statics;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Transfers.Commands.ForwardTransfer
{
    public class ForwardTransferHandler : IRequestHandler<ForwardTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public ForwardTransferHandler(IApplicationDbContext dbContext, IMapper mapper, IMediator mediator)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(ForwardTransferCommand request, CancellationToken cancellationToken)
        {
            var targetTransfer = _dbContext.Transfers.GetById(request.TransferId);
            targetTransfer.Forwarded = true;
            await _dbContext.SaveChangesAsync(cancellationToken);
            var targetFriend = _dbContext.Friends.GetById(request.FriendId);
            var newTransfer = _mapper.Map<Transfer>(targetTransfer);
            newTransfer.FromCurrency = targetTransfer.ToCurrency;
            newTransfer.Forwarded = false;
            newTransfer.FromRate = 1;
            newTransfer.SourceAmount = targetTransfer.DestinationAmount;
            newTransfer.DestinationAmount = targetTransfer.DestinationAmount;
            newTransfer.ToRate = 1;
            newTransfer.SenderId = targetTransfer.ReceiverId.ToGuid();
            newTransfer.ReceiverId = targetFriend.CustomerFriendId;
            newTransfer.ReceiverFee = request.ReceiverFee;
            newTransfer.Comment = request.Comment;
            newTransfer.CodeNumber = request.CodeNumber;
            newTransfer.AccountType = TransferAccountTypesStatic.MyAccount;
            newTransfer.Fee = 0;
            if (targetTransfer.ForwardedTransferId.IsNull())
            {
                newTransfer.ForwardedTransferId = targetTransfer.Id;
                newTransfer.ForwardPriority = 0;

            }
            else
            {
                newTransfer.ForwardPriority = _dbContext.Transfers.GetForwardPriority(targetTransfer.ForwardedTransferId.ToGuid());
                newTransfer.ForwardedTransferId = targetTransfer.ForwardedTransferId;
            }

            newTransfer.ParentForwardedId = targetTransfer.Id;
            newTransfer.Id = Guid.NewGuid();
            await _dbContext.Transfers.AddAsync(newTransfer, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new TransferCreated(newTransfer.Id), cancellationToken);
            return Unit.Value;
        }
    }
}