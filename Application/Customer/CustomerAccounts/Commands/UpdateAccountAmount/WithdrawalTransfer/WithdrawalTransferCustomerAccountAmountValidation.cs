using System;
using System.Linq;
using Application.Common.Extensions;
using Application.SubCustomers.Commands.UpdateAccountAmount.WithdrawalTransfer;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.WithdrawalTransfer
{
    public class WithdrawalTransferCustomerAccountAmountValidation:AbstractValidator<WithdrawalTransferCustomerAccountAmountCommand>
    {
        public WithdrawalTransferCustomerAccountAmountValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.TransferId)
                .NotEqual(Guid.Empty)
                .NotNull().WithMessage("ای دی حواله ضروری میباشد");
            RuleFor(a => a.CustomerAccountId)
                .NotEqual(Guid.Empty).WithMessage("ای دی حساب شما ضروری میباشد")
                .Must(customerAccountId => dbContext.CustomerAccounts.Any(a =>
                    a.CustomerId == httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.Id == customerAccountId)).WithMessage("حساب شما پیدا نشد");
            RuleFor(a => a.Amount)
                .NotNull().WithMessage("مقدار پول ضروری میباشد")
                .GreaterThanOrEqualTo(1).WithMessage("کم تر از 1 مجاز نیست")
                .Must((model,amount)=>dbContext.CustomerAccounts.Any(a=>
                    a.Id==model.CustomerAccountId &&
                    a.Amount>=amount)).WithMessage("مقدار پول کافی در حساب شما وجود ندارد");
        }
    }
}