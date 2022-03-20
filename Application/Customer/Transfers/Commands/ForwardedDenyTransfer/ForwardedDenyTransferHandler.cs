﻿using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Balances.Commands.RollbackAmount;
using Application.Customer.Balances.Statics;
using Application.Customer.CustomerAccounts.Commands.Transactions.RollbackTransaction;
using Application.Customer.CustomerAccounts.Extensions;
using Application.Customer.Transfers.EventHandlers;
using Application.SunriseSuperAdmin.Rates.Extensions;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Transfers.Commands.ForwardedDenyTransfer
{
    public class ForwardedDenyTransferHandler : IRequestHandler<ForwardedDenyTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;

        public ForwardedDenyTransferHandler(IApplicationDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(ForwardedDenyTransferCommand request, CancellationToken cancellationToken)
        {
            var targetTransfer = _dbContext.Transfers.GetById(request.TransferId);
            if (targetTransfer.State == TransfersStatusTypes.Completed)
            {
                var targetRate = _dbContext.RatesCountries.GetByPriceName(targetTransfer.ToCurrency);
                var targetTransaction = _dbContext.CustomerAccountTransactions.GetByTransferId(targetTransfer.Id,
                    targetTransfer.ReceiverId.ToGuid());
                if (!request.EnableForwarded)
                {
                    await _mediator.Send(new CRollbackTransactionCommand(targetTransaction.Id, true),
                        cancellationToken);
                }

                await _mediator.Send(new RollbackBalanceAmountCommand(
                    targetTransfer.ReceiverId.ToGuid(),
                    targetTransfer.SenderId,
                    targetRate.Id,
                    targetTransfer.DestinationAmount + targetTransfer.ReceiverFee,
                    BalanceTransactionTypes.Talab), cancellationToken);
            }

            targetTransfer.State = TransfersStatusTypes.Denied;
            await _dbContext.SaveChangesAsync(cancellationToken);
            
            await _mediator.Publish(new TransferDenied(targetTransfer.Id),
                cancellationToken);

            if (targetTransfer.ParentForwardedId.IsNotNull())
            {
                await _mediator.Send(new ForwardedDenyTransferCommand(targetTransfer.ParentForwardedId.ToGuid(), true)
                    , cancellationToken);
            }

            return Unit.Value;
        }
    }
}