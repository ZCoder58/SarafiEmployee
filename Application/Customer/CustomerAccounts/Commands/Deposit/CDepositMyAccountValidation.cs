using System;
using Application.Common.Extensions;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit;
using Application.Customer.CustomerAccounts.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.CustomerAccounts.Commands.Deposit
{
    public class CDepositMyAccountValidation:AbstractValidator<CDepositMyAccountCommand>
    {
        public CDepositMyAccountValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.RateCountryId)
                .NotEqual(Guid.Empty).WithMessage("ای دی اکانت ضروری میباشد")
                .Must(rateCountryId=>dbContext.CustomerAccounts.IsExistsByCountryRateId(
                    httpUserContext.GetCurrentUserId().ToGuid(),rateCountryId)).WithMessage("حساب پیدا نشد");
            RuleFor(a => a.Amount)
                .NotNull().WithMessage("مقدار پول ضروری میباشد")
                .GreaterThanOrEqualTo(1).WithMessage("کم تر از 1 مجاز نیست");
        }
    }
}