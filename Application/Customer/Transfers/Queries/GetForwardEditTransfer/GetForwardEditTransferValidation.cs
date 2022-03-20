using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Statics;
using Application.Customer.Transfers.Queries.GetEditTransfer;
using Application.Customer.Transfers.Statics;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Transfers.Queries.GetForwardEditTransfer
{
    public class GetForwardEditTransferValidation:AbstractValidator<GetForwardEditTransferQuery>
    {
        public GetForwardEditTransferValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.Id)
                .NotEqual(Guid.Empty)
                .Must(id => dbContext.Transfers.Where(a=>a.Id==id && a.ParentForwardedId!=null).Any(a =>
                    (a.State == TransfersStatusTypes.InProgress ||
                     a.State == TransfersStatusTypes.Denied) &&
                    a.AccountType==TransferAccountTypesStatic.MyAccount &&
                    a.SenderId == httpUserContext.GetCurrentUserId().ToGuid())).WithMessage("درخواست نامعتبر");
        }
    }
}