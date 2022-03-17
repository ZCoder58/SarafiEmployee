using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Statics;
using Application.Customer.Transfers.Statics;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Transfers.Queries.GetEditTransfer
{
    public class GetEditTransferValidation:AbstractValidator<GetEditTransferQuery>
    {
        public GetEditTransferValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.Id)
                .NotEqual(Guid.Empty)
                .Must(id => dbContext.Transfers.Any(a =>
                    a.Id == id &&
                    a.State == TransfersStatusTypes.InProgress &&
                    a.State == TransfersStatusTypes.Denied &&
                    a.AccountType==TransferAccountTypesStatic.MyAccount &&
                    a.SenderId == httpUserContext.GetCurrentUserId().ToGuid())).WithMessage("درخواست نامعتبر");
        }
    }
}