using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.EditAccountRate
{
    public class CsEditAccountRateValidation:AbstractValidator<CsEditAccountRateCommand>
    {
        public CsEditAccountRateValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
      
            RuleFor(a => a.Id)
                .Cascade(CascadeMode.Stop)
                .NotEqual(Guid.Empty).WithMessage("ای دی ضروری میباشد")
                .Must(id => dbContext.SubCustomerAccountRates
                    .Include(a=>a.SubCustomerAccount)
                    .Any(a =>a.Id == id &&
                    a.SubCustomerAccount.CustomerId == httpUserContext.GetCurrentUserId().ToGuid()))
                .WithMessage("حساب نامعتبر");
            RuleFor(a => a.RatesCountryId)
                .Cascade(CascadeMode.Stop)
                .NotEqual(Guid.Empty).WithMessage("انتخاب نوع ارز ضروری میباشد")
                .Must(dbContext.RatesCountries.IsExists).WithMessage("ارز نامعتبر")
                .Must((model, ratesCountryId)=>!dbContext.SubCustomerAccountRates
                    .Include(a=>a.SubCustomerAccount).Any(a =>
                   a.Id!=model.Id &&
                   a.SubCustomerAccountId==model.SubCustomerAccountId &&
                   a.RatesCountryId==ratesCountryId)).WithMessage("حساب با این ارز قبلا اضافه شده است");
        }   
    }
}