using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.EditAccountRate
{
    public class CsEditAccountRateValidation : AbstractValidator<CsEditAccountRateCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;

        public CsEditAccountRateValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;

            RuleFor(a => a.Id)
                .Cascade(CascadeMode.Stop)
                .NotEqual(Guid.Empty).WithMessage("ای دی ضروری میباشد")
                .Must((model, id) => dbContext.SubCustomerAccountRates
                    .Include(a => a.SubCustomerAccount)
                    .Any(a =>
                        a.Id == id &&
                        a.SubCustomerAccount.CustomerId == httpUserContext.GetCurrentUserId().ToGuid()))
                .WithMessage("حساب نامعتبر");
            RuleFor(a => a.ExchangeType)
                .NotNull().WithMessage("انتخاب نوع ارز ضروری میباشد")
                .Must(exchangeType => exchangeType == "buy" || exchangeType == "sell")
                .WithMessage("نوعیت معامله ضروری میباشد");
            RuleFor(a => a.ToRatesCountryId)
                .Cascade(CascadeMode.Stop)
                .NotEqual(Guid.Empty).WithMessage("انتخاب نوع ارز ضروری میباشد")
                .Must(dbContext.RatesCountries.IsExists).WithMessage("ارز نامعتبر")
                .Must(IsAlreadyExists).WithMessage("حساب با این ارز قبلا اضافه شده است");
        }

        public bool IsAlreadyExists(CsEditAccountRateCommand model, Guid toRateCountryId)
        {
            var targetAccount = _dbContext.SubCustomerAccountRates
                .Include(a => a.SubCustomerAccount).FirstOrDefault(a =>
                    a.Id == model.Id);
            return targetAccount.RatesCountryId == toRateCountryId || _dbContext.SubCustomerAccountRates
                .Include(a => a.SubCustomerAccount).Any(a =>
                    a.Id != targetAccount.Id &&
                    a.RatesCountryId == toRateCountryId &&
                    a.SubCustomerAccount.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid());
        }
    }
}