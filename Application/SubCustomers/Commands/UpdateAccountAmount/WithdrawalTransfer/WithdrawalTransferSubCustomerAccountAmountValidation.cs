using System;
using System.Linq;
using Application.Common.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.SubCustomers.Commands.UpdateAccountAmount.WithdrawalTransfer
{
    public class WithdrawalTransferSubCustomerAccountAmountValidation:AbstractValidator<WithdrawalTransferSubCustomerAccountAmountCommand>
    {
        public WithdrawalTransferSubCustomerAccountAmountValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.TransferId)
                .NotEqual(Guid.Empty)
                .NotNull().WithMessage("ای دی حواله ضروری میباشد");
            RuleFor(a => a.SubCustomerId)
                .NotEqual(Guid.Empty).WithMessage("ای دی مشتری ضروری میباشد")
                .Must(subCustomerId => dbContext.SubCustomerAccounts.Any(a =>
                    a.CustomerId == httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.Id == subCustomerId)).WithMessage("مشتری پیدا نشد");
            RuleFor(a => a.SubCustomerAccountRateId)
                .NotEqual(Guid.Empty).WithMessage("حساب ارز مشتری ضروری میباشد")
                .Must((model, subCustomerAccountRateId) => dbContext.SubCustomerAccountRates.Any(a =>
                    a.Id == subCustomerAccountRateId &&
                    a.SubCustomerAccountId == model.SubCustomerId)).WithMessage("حساب ارز مشتری پیدا نشد");
            RuleFor(a => a.Amount)
                .NotNull().WithMessage("مقدار پول ضروری میباشد")
                .GreaterThanOrEqualTo(1).WithMessage("کم تر از 1 مجاز نیست");
        }
    }
}