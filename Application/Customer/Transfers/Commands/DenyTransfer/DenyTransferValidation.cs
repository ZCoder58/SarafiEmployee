using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Transfers.Extensions;
using Domain.Interfaces;
using Domain.Interfaces.IHubs.IAccessors;
using FluentValidation;

namespace Application.Customer.Transfers.Commands.DenyTransfer
{
    public class DenyTransferValidation : AbstractValidator<DenyTransferCommand>
    {
        private readonly IHttpUserContext _httpUserContext;
        private readonly IApplicationDbContext _dbContext;

        public DenyTransferValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            RuleFor(a => a.TransferId)
                .NotNull().WithMessage("ای دی حواله ضروری میباشد")
                .Must(IsValidReceiver)
                .WithMessage("درخواست رد شد");
        }

        public bool IsValidReceiver(DenyTransferCommand model,Guid transferId)
        {
            var targetTransfer = _dbContext.Transfers.GetById(transferId);
            return (targetTransfer.ReceiverId == _httpUserContext.GetCurrentUserId().ToGuid()) &&
                   (!targetTransfer.Forwarded && targetTransfer.ParentForwardedId.IsNull()) &&
                   (targetTransfer.State == TransfersStatusTypes.InProgress ||
                    (targetTransfer.State==TransfersStatusTypes.Completed &&
                     (!targetTransfer.Forwarded && targetTransfer.ParentForwardedId.IsNull()) &&
                     targetTransfer.CompleteDate.Value.Date >= CDateTime.Now.AddDays(-1).Date &&
                     targetTransfer.CompleteDate.Value.Date <= CDateTime.Now.Date));
        }

    }
}