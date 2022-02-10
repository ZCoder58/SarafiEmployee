using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Transfers.Commands.SetTransferComplete
{
    public class SetTransferCompleteValidation:AbstractValidator<SetTransferCompleteCommand>
    {
        private readonly IHttpUserContext _httpUserContext;
        private readonly IApplicationDbContext _dbContext;
        public SetTransferCompleteValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            RuleFor(a => a.TransferId)
                .NotNull().WithMessage("ای دی حواله ضروری میباشد")
                .Must(Valid)
                .WithMessage("درخواست رد شد");
            RuleFor(a => a.Phone)
                .NotNull().WithMessage("شماره تماس دریافت کننده پول ضروری میباشد");
            RuleFor(a => a.SId)
                .NotNull().WithMessage("نمبر تذکره دریافت کننده پول ضروری میباشد");
        }

        public bool Valid(Guid transferId)
        {
            var targetTransferId = _dbContext.Transfers.GetById(transferId);
            return targetTransferId.ReceiverId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                   targetTransferId.State == TransfersStatusTypes.InProgress;
        }
    }
}