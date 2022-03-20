using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Transfers.Commands.DenyTransfer;
using Domain.Interfaces;
using Domain.Interfaces.IHubs.IAccessors;
using FluentValidation;

namespace Application.Customer.Transfers.Commands.ForwardedDenyTransfer
{
    public class ForwardedDenyTransferValidation : AbstractValidator<ForwardedDenyTransferCommand>
    {
        private readonly IHttpUserContext _httpUserContext;
        private readonly IApplicationDbContext _dbContext;
        private readonly INotifyHubAccessor _notifyHub;

        public ForwardedDenyTransferValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext,
            INotifyHubAccessor notifyHub)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _notifyHub = notifyHub;
            RuleFor(a => a.TransferId)
                .NotNull().WithMessage("ای دی حواله ضروری میباشد")
                .Must(IsValidReceiver)
                .WithMessage("درخواست رد شد")
                .MustAsync(CheckValidForwardedAsync).WithMessage("منتظر اجرای حواله باشید");
        }

        public bool IsValidReceiver(ForwardedDenyTransferCommand model,Guid transferId)
        {
            var targetTransfer = _dbContext.Transfers.GetById(transferId);
            return (targetTransfer.ReceiverId == _httpUserContext.GetCurrentUserId().ToGuid() ||
                    model.EnableForwarded) &&
                   (targetTransfer.State == TransfersStatusTypes.InProgress || 
                    targetTransfer.State==TransfersStatusTypes.Completed &&
                    targetTransfer.CompleteDate.Value.Date >= CDateTime.Now.AddDays(-1).Date &&
                    targetTransfer.CompleteDate.Value.Date <= CDateTime.Now.Date);
        }

        public async Task<bool> CheckValidForwardedAsync(ForwardedDenyTransferCommand model, Guid transferId,
            CancellationToken cancellationToken)
        {
            var targetTransfer = _dbContext.Transfers.GetById(transferId);
            if (!targetTransfer.Forwarded || model.EnableForwarded) return true;
            await _notifyHub.NotifySelfAsync("این حواله ارجاع شده لطفا منتظر اجرای حواله باشید", "error");
            return false;
        }
    }
}