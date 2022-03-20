using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Statics;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Transfers.Commands.ResendTransfer
{
    public class ResendTransferValidation:AbstractValidator<ResendTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        public ResendTransferValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            RuleFor(a => a.TransferId)
                .Cascade(CascadeMode.Stop)
                .NotEqual(Guid.Empty)
                .NotNull()
                .Must(Valid)
                .WithMessage("invalid request");
        }

        public bool Valid(ResendTransferCommand model,Guid transferId)
        {
            return _dbContext.Transfers.Any(a =>
                a.Id == transferId &&
                (a.ForwardedTransferId==null ||model.EnableForwarded)&&
                a.State==TransfersStatusTypes.Denied &&
                (a.SenderId == _httpUserContext.GetCurrentUserId().ToGuid() || model.EnableForwarded));
        }
    }
}