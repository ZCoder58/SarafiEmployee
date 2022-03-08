using System;
using System.Linq;
using Application.Common.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Withdrawal
{
    public class WithdrawalCustomerAccountAmountValidation:AbstractValidator<WithdrawalCustomerAccountAmountCommand>
    {
        public WithdrawalCustomerAccountAmountValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.CustomerAccountId)
                .NotEqual(Guid.Empty).WithMessage("ای دی حساب ارز شما ضروری میباشد")
                .Must(customerId => dbContext.CustomerAccounts.Any(a =>
                    a.CustomerId == httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.Id == customerId)).WithMessage("حساب شما پیدا نشد");
            RuleFor(a => a.Amount)
                .NotNull().WithMessage("مقدار ضروری میباشد")
                .GreaterThanOrEqualTo(1).WithMessage("کمتر از 1 مجاز نیست")
                .Must((model,amount)=>dbContext.CustomerAccounts.Any(a=>
                    a.Id==model.CustomerAccountId &&
                    a.Amount>=amount)).WithMessage("مقدار پول کافی در حساب شما وجود ندارد");
        }
    }
}