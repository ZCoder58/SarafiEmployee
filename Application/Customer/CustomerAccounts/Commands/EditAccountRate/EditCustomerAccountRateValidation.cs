using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.SubCustomers.Commands.EditAccountRate;
using Domain.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.CustomerAccounts.Commands.EditAccountRate
{
    public class EditCustomerAccountRateValidation:AbstractValidator<EditAccountRateCommand>
    {
        public EditCustomerAccountRateValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.Amount)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("مقدار پول ضروری میباشد")
                .GreaterThanOrEqualTo(0).WithMessage("کمتر از صفر مجاز نیست");
            RuleFor(a => a.Id)
                .Cascade(CascadeMode.Stop)
                .NotEqual(Guid.Empty).WithMessage("ای دی ضروری میباشد")
                .Must(id => dbContext.CustomerAccounts
                    .Any(a =>a.Id == id &&
                    a.CustomerId == httpUserContext.GetCurrentUserId().ToGuid()))
                .WithMessage("حساب نامعتبر");
            RuleFor(a => a.RatesCountryId)
                .Cascade(CascadeMode.Stop)
                .NotEqual(Guid.Empty).WithMessage("انتخاب نوع ارز ضروری میباشد")
                .Must(dbContext.RatesCountries.IsExists).WithMessage("ارز نامعتبر")
                .Must((model, ratesCountryId)=>!dbContext.CustomerAccounts
                    .Any(a =>
                   a.Id!=model.Id &&
                   a.RatesCountryId==ratesCountryId)).WithMessage("حساب با این ارز قبلا اضافه شده است");
        }   
    }
}