using System;
using System.Linq;
using Application.Common.Extensions;
using Application.SubCustomers.Commands.UpdateAccountAmount.Deposit;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit
{
    public class DepositCustomerAccountAmountValidation:AbstractValidator<DepositCustomerAccountAmountCommand>
    {
        public DepositCustomerAccountAmountValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            
            RuleFor(a => a.Id)
                .NotEqual(Guid.Empty).WithMessage("ای دی اکانت ضروری میباشد")
                .Must(id => dbContext.CustomerAccounts.Any(a =>
                    a.CustomerId == httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.Id == id)).WithMessage("حساب پیدا نشد");
           
            RuleFor(a => a.Amount)
                .NotNull().WithMessage("مقدار پول ضروری میباشد")
                .GreaterThanOrEqualTo(1).WithMessage("کم تر از 1 مجاز نیست");
        }
    }
}