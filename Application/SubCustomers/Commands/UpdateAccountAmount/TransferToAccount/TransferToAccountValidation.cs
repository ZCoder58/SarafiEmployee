using System;
using System.Linq;
using Application.Common.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.SubCustomers.Commands.UpdateAccountAmount.TransferToAccount
{
    public class TransferToAccountValidation : AbstractValidator<TransferToAccountCommand>
    {
        public TransferToAccountValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            
            RuleFor(a => a.SubCustomerId)
                .NotEqual(Guid.Empty).WithMessage("ای دی مشتری اول ضروری میباشد")
                .Must(subCustomerId => dbContext.SubCustomerAccounts.Any(a =>
                    a.CustomerId == httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.Id == subCustomerId)).WithMessage("مشتری اول پیدا نشد")
                .Must((model,subCustomerId)=>model.ToSubCustomerId!=subCustomerId)
                .WithMessage("درخواست نا معتبر");
            RuleFor(a => a.ToSubCustomerId)
                .NotEqual(Guid.Empty).WithMessage("ای دی مشتری دوم ضروری میباشد")
                .Must(toSubCustomerId => dbContext.SubCustomerAccounts.Any(a =>
                    a.CustomerId == httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.Id == toSubCustomerId)).WithMessage("مشتری دوم پیدا نشد");
            RuleFor(a => a.SubCustomerAccountRateId)
                .NotEqual(Guid.Empty).WithMessage("حساب ارز مشتری اول ضروری میباشد")
                .Must((model, subCustomerAccountRateId) => dbContext.SubCustomerAccountRates.Any(a =>
                    a.Id == subCustomerAccountRateId &&
                    a.SubCustomerAccountId == model.SubCustomerId)).WithMessage("حساب ارز مشتری اول پیدا نشد");
            RuleFor(a => a.ToSubCustomerAccountRateId)
                .NotEqual(Guid.Empty).WithMessage("حساب ارز مشتری دوم ضروری میباشد")
                .Must((model, toSubCustomerAccountRateId) => dbContext.SubCustomerAccountRates.Any(a =>
                    a.Id == toSubCustomerAccountRateId &&
                    a.SubCustomerAccountId == model.ToSubCustomerId)).WithMessage("حساب ارز مشتری دوم پیدا نشد");
            RuleFor(a => a.Amount)
                .NotNull().WithMessage("مقدرار ضروری میباشد")
                .GreaterThanOrEqualTo(1).WithMessage("کمتر از 1 مجاز نیست")
                .Must((model,amount)=>dbContext.SubCustomerAccountRates.Any(a=>
                    a.Id==model.SubCustomerAccountRateId &&
                    a.Amount>=amount)).WithMessage("این مقدار پول در حساب مشتری وجود ندارد");
            
        }
    }
}