using System;
using System.Linq;
using Application.Common.Extensions;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.UpdateAmount
{
    public class UpdateSubCustomerAmountValidation:AbstractValidator<UpdateSubCustomerAmountCommand>
    {
        public UpdateSubCustomerAmountValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.SubCustomerAccountRateId)
                .NotEqual(Guid.Empty).WithMessage("ای دی ضروری میباشد")
                .Must(subCustomerAccountRateId => dbContext.SubCustomerAccounts.Include(a=>a.SubCustomerAccountRates).Any(a =>
                    a.CustomerId == httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.SubCustomerAccountRates.Any(b=>b.Id==subCustomerAccountRateId))).WithMessage("حساب ارز نامعتبر");
            RuleFor(a => a.Amount)
                .NotNull().WithMessage("مقدار پول اولیه حساب ضروری میباشد")
                .GreaterThanOrEqualTo(0).WithMessage("کم تر از صفر مجاز نیست")
                .Must((model,amount)=>dbContext.SubCustomerAccountRates
                    .Any(a=>a.Id==model.SubCustomerAccountRateId &&
                            ((a.Amount >= amount && model.Type == SubCustomerTransactionTypes.Withdrawal) || 
                             model.Type==SubCustomerTransactionTypes.Deposit))).WithMessage("این مقدار پول در حساب موجود نیست");
            RuleFor(a => a.Type)
                .Must(type => type == SubCustomerTransactionTypes.Withdrawal ||
                              type == SubCustomerTransactionTypes.Deposit
                ).WithMessage("نوع انتقال درست نمیباشد");
        }
    }
}