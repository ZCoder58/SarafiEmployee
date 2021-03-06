using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Statics;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Transfers.Queries.GetTransferDetailInbox
{
    public class GetTransferDetailInboxValidation:AbstractValidator<GetTransferDetailInboxQuery>
    {
        public GetTransferDetailInboxValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.TransferId)
                .NotNull()
                .NotEqual(Guid.Empty)
                .Must(transferId =>
                {
                   return  dbContext.Transfers.Any(a =>
                       (a.State == TransfersStatusTypes.Completed || 
                        a.State == TransfersStatusTypes.InProgress)&&
                        a.Id == transferId &&
                        a.ReceiverId == httpUserContext.GetCurrentUserId().ToGuid());
                }).WithMessage("درخواست رد شد");
        }
    }
}