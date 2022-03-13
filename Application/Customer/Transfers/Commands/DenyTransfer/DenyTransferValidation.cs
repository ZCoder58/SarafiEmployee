using System;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Transfers.Commands.DenyTransfer
{
    public class DenyTransferValidation:AbstractValidator<DenyTransferCommand>
    {
        private readonly IHttpUserContext _httpUserContext;
        private readonly IApplicationDbContext _dbContext;
        public DenyTransferValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            RuleFor(a => a.TransferId)
                .NotNull().WithMessage("ای دی حواله ضروری میباشد")
                .Must(Valid)
                .WithMessage("درخواست رد شد");
        }

        public bool Valid(Guid transferId)
        {
            var targetTransfer = _dbContext.Transfers.GetById(transferId);
            return targetTransfer.ReceiverId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                   targetTransfer.State == TransfersStatusTypes.InProgress ||
                   targetTransfer.CompleteDate?.Date>=CDateTime.Now.AddDays(-1).Date;
        }
    }
}