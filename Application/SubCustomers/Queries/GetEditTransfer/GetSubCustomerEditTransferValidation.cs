using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Statics;
using Application.Customer.Transfers.Queries.GetEditTransfer;
using Application.Customer.Transfers.Statics;
using Domain.Interfaces;
using FluentValidation;

namespace Application.SubCustomers.Queries.GetEditTransfer
{
    public class GetSubCustomerEditTransferValidation:AbstractValidator<GetSubCustomerEditTransferQuery>
    {
        public GetSubCustomerEditTransferValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.Id)
                .NotEqual(Guid.Empty)
                .Must(id => dbContext.Transfers.Any(a =>
                    a.Id == id &&
                    (a.State == TransfersStatusTypes.InProgress ||
                     a.State == TransfersStatusTypes.Denied) &&
                    a.AccountType==TransferAccountTypesStatic.SubCustomerAccount &&
                    a.SenderId == httpUserContext.GetCurrentUserId().ToGuid())).WithMessage("درخواست نامعتبر");
        }
    }
}