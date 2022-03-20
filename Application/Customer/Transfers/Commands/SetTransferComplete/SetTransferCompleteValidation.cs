using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Transfers.Extensions;
using Domain.Interfaces;
using Domain.Interfaces.IHubs.IAccessors;
using FluentValidation;

namespace Application.Customer.Transfers.Commands.SetTransferComplete
{
    public class SetTransferCompleteValidation:AbstractValidator<SetTransferCompleteCommand>
    {
        private readonly IHttpUserContext _httpUserContext;
        private readonly IApplicationDbContext _dbContext;
        private readonly INotifyHubAccessor _notify;
        public SetTransferCompleteValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, INotifyHubAccessor notify)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _notify = notify;
            RuleFor(a => a.TransferId)
                .NotNull().WithMessage("ای دی حواله ضروری میباشد")
                .Must((model,tId)=>
                    dbContext.Transfers.Where(a=>a.State==TransfersStatusTypes.InProgress)
                    .IsReceiver(httpUserContext.GetCurrentUserId().ToGuid(),tId) ||
                    model.Forwarded)
                .WithMessage("درخواست رد شد")
                .MustAsync(CheckValidForwardedAsync).WithMessage("منتظر اجرای حواله باشید");
            RuleFor(a => a.Phone)
                .NotNull().WithMessage("شماره تماس دریافت کننده پول ضروری میباشد");
        }

        public async Task<bool> CheckValidForwardedAsync(SetTransferCompleteCommand model,Guid transferId,CancellationToken cancellationToken)
        {
            var targetTransfer = _dbContext.Transfers.GetById(transferId);
            if (targetTransfer.ForwardedTransferId.IsNotNull() && targetTransfer.Forwarded && !model.Forwarded)
            {
                await _notify.NotifySelfAsync("این حواله ارجاع شده لطفا منتظر اجرای حواله باشید", "error");
                return false;
            }

            return true;
        }
    }
}