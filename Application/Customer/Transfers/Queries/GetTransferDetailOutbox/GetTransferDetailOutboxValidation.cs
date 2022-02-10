using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Customer.Transfers.Queries.GetTransferDetailOutbox;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Transfers.Queries.GetTransferDetailOutbox
{
    public class GetTransferDetailOutboxValidation:AbstractValidator<GetTransferDetailOutboxQuery>
    {
        public GetTransferDetailOutboxValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.TransferId)
                .NotNull()
                .NotEqual(Guid.Empty)
                .Must(transferId =>
                {
                    return dbContext.Transfers.Any(a =>
                        a.Id == transferId &&
                        a.SenderId == httpUserContext.GetCurrentUserId().ToGuid());
                }).WithMessage("درخواست رد شد");
        }
    }
}