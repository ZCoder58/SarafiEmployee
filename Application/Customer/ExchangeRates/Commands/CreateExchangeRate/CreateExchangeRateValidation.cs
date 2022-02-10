using Application.Common.Extensions;
using Application.SunriseSuperAdmin.Rates.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.ExchangeRates.Commands.CreateExchangeRate
{
    public class CreateExchangeRateValidation:AbstractValidator<CreateExchangeRateCommand>
    {
        public CreateExchangeRateValidation(IApplicationDbContext dbContext)
        {
            RuleFor(a => a.AbbrFrom)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                .Must(abbrFrom=>dbContext.RatesCountries.GetByAbbr(abbrFrom).IsNotNull()).WithMessage("درخواست رد شد");
            RuleFor(a => a.AbbrTo)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                .Must(abbrTo=>dbContext.RatesCountries.GetByAbbr(abbrTo).IsNotNull()).WithMessage("درخواست رد شد");

        }
    }
}