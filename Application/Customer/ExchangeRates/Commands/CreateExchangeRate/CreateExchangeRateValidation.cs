using System;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.ExchangeRates.Extensions;
using Application.SunriseSuperAdmin.Rates.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.ExchangeRates.Commands.CreateExchangeRate
{
    public class CreateExchangeRateValidation:AbstractValidator<CreateExchangeRateCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        public CreateExchangeRateValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            RuleFor(a => a.FromCurrency)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                .NotEqual(Guid.Empty).WithMessage("انتخاب ارز مبدا ضروری میباشد")
                .Must(fromCurrency=>dbContext.RatesCountries.IsExists(fromCurrency)).WithMessage("درخواست رد شد")
                .Must(IsNotAlreadyAdded).WithMessage("نرخ ارز قبلا اضافه شده است");
            RuleFor(a => a.ToCurrency)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                .NotEqual(Guid.Empty).WithMessage("انتخاب ارز مقصد ضروری میباشد")
                .Must(toCurrency=>dbContext.RatesCountries.IsExists(toCurrency)).WithMessage("درخواست رد شد");
            RuleFor(a => a.FromAmount)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("نرخ ارز ضروری میباشد")
                .GreaterThanOrEqualTo(0).WithMessage("کوچکتر از 0 مجاز نیست"); 
            RuleFor(a => a.ToAmountSell)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("نرخ خرید معادل ضروری میباشد")
                .GreaterThanOrEqualTo(0).WithMessage("کوچکتر از 0 مجاز نیست");
            RuleFor(a => a.ToAmountBuy)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("نرخ فروش معادل ضروری میباشد")
                .GreaterThanOrEqualTo(0).WithMessage("کوچکتر از 0 مجاز نیست");
        }

        public bool IsNotAlreadyAdded(CreateExchangeRateCommand model,Guid fromCurrency)
        {
            var target= _dbContext.CustomerExchangeRates.GetTodayExchangeRateById(
                _httpUserContext.GetCurrentUserId().ToGuid(),model.FromCurrency,model.ToCurrency);
            return target.IsNull();
        }
    }
}