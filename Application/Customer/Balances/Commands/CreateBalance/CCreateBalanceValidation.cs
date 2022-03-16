using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Customer.Balances.Statics;
using Application.Customer.Friend.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Balances.Commands.CreateBalance
{
    public class CCreateBalanceValidation:AbstractValidator<CCreateBalanceCommand>
    {
        public CCreateBalanceValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.Amount)
                .NotNull().WithMessage("مقدار ضروری میباشد");
            RuleFor(a => a.Type)
                .NotNull().WithMessage("انتخاب نوعیت بیلانس ضروری میباشد")
                .Must(type => type == BalanceTransactionTypes.Talab || type == BalanceTransactionTypes.Rasid)
                .WithMessage("نوعیت بیلانس درست نمیباشد");
            RuleFor(a => a.FId)
                .NotNull()
                .NotEqual(Guid.Empty).WithMessage("ای دی همکار شما ضروری است")
                .Must(fId => dbContext.Friends.IsCustomerApprovedFriend(httpUserContext.GetCurrentUserId().ToGuid(),
                    fId)).WithMessage("ای دی همکار نامعتبر");
        }
    }
}