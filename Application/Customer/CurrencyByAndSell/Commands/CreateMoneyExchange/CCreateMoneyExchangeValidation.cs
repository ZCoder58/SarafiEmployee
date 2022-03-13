using System;
using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using FluentValidation;
using MediatR;

namespace Application.Customer.CurrencyByAndSell.Commands.CreateMoneyExchange
{
    public class CCreateMoneyExchangeValidation:AbstractValidator<CCreateMoneyExchangeCommand>
    {
        public CCreateMoneyExchangeValidation(IApplicationDbContext dbContext)
        {
            RuleFor(a => a.Amount)
                .NotNull().WithMessage("مقدار پول ضروری میباشد")
                .GreaterThanOrEqualTo(1).WithMessage("کمتر از 1 مجاز نیست");
            RuleFor(a => a.FromRateCountryId)
                .NotEqual(Guid.Empty)
                .NotNull().WithMessage("انتخاب نوعیت ارز اول ضروری میباشد")
                .Must(dbContext.RatesCountries.IsExists).WithMessage("ارز نامعتبر");
            RuleFor(a => a.ToRateCountryId)
                .NotEqual(Guid.Empty)
                .NotNull().WithMessage("انتخاب نوعیت ارز دوم ضروری میباشد")
                .Must((model,toRate)=>toRate!=model.FromRateCountryId)
                .WithMessage("ارز معامله نمیتواند یکسان باشد")
                .Must(dbContext.RatesCountries.IsExists).WithMessage("ارز نامعتبر");
            RuleFor(a => a.ExchangeType)
                .NotNull().WithMessage("انتخاب نوعیت معامله ضروری میباشد")
                .Must(type => type == "buy" || type == "sell").WithMessage("نوعیت معامله نا معتبر");
        }
    }
}