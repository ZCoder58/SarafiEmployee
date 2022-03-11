using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.WithdrawalTransfer;
using Application.Customer.Transfers.EventHandlers;
using Application.SunriseSuperAdmin.Rates.Extensions;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Transfers.Commands.SetTransferComplete
{
    public class SetTransferCompleteHandler:IRequestHandler<SetTransferCompleteCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;
        public SetTransferCompleteHandler(IApplicationDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(SetTransferCompleteCommand request, CancellationToken cancellationToken)
        {
            
            var targetTransfer = _dbContext.Transfers
                .GetById(request.TransferId);
            var targetCountryRate = _dbContext.RatesCountries.GetByPriceName(targetTransfer.ToCurrency);
            await _mediator.Send(new CWithdrawalAccountTransferCommand(
                true,
                targetCountryRate.Id,
                targetTransfer.DestinationAmount,
                "برداشت پول برای اجرای حوابه",
                targetTransfer.Id
            ), cancellationToken);
            targetTransfer.State = TransfersStatusTypes.Completed;
            targetTransfer.ToPhone = request.Phone;
            targetTransfer.ToSId = request.SId;
            targetTransfer.CompleteDate=CDateTime.Now;
            await _dbContext.SaveChangesAsync(cancellationToken);
           await _mediator.Publish(new TransferCompleted(),cancellationToken);
           return Unit.Value;
        }
    }
}