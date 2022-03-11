using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Customer.CustomerAccounts.Extensions;
using Application.Customer.Transfers.Extensions;
using Application.SubCustomers.Commands.UpdateAccountAmount.Deposit;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit
{
    public class CDepositAccountValidation:AbstractValidator<CDepositAccountCommand>
    {
        public CDepositAccountValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.AccountRateId)
                .NotEqual(Guid.Empty).WithMessage("ای دی اکانت ضروری میباشد");
            RuleFor(a => a.Amount)
                .NotNull().WithMessage("مقدار پول ضروری میباشد")
                .GreaterThanOrEqualTo(1).WithMessage("کم تر از 1 مجاز نیست");
        }
    }
}