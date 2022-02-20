using System;
using System.Linq;
using Application.Common.Extensions;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using FluentValidation;

namespace Application.SubCustomers.Commands.UpdateAmount
{
    public class UpdateSubCustomerAmountValidation:AbstractValidator<UpdateSubCustomerAmountCommand>
    {
        public UpdateSubCustomerAmountValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.Id)
                .NotEqual(Guid.Empty).WithMessage("ای دی ضروری میباشد")
                .Must(id => dbContext.SubCustomerAccounts.Any(a =>
                    a.CustomerId == httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.Id == id)).WithMessage("مشتری نامعتبر");
            RuleFor(a => a.Amount)
                .NotNull().WithMessage("مقدار پول اولیه حساب ضروری میباشد")
                .GreaterThan(0).WithMessage("کم تر از صفر مجاز نیست");
            RuleFor(a => a.Type)
                .Must(type => type == SubCustomerTransactionTypes.Withdrawal ||
                              type == SubCustomerTransactionTypes.Deposit
                ).WithMessage("نوع انتقال درست نمیباشد");
        }
    }
}