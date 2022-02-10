using System;
using System.Data;
using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.ExchangeRates.Commands.CreateExchangeRatesForDate
{
    public class CreateExchangeRatesFroDateValidation:AbstractValidator<CreateExchangeRatesForDateCommand>
    {
        public CreateExchangeRatesFroDateValidation(IApplicationDbContext dbContext)
        {
            RuleFor(a => a.RateCountryId)
                .NotNull()
                .Must(dbContext.RatesCountries.IsExists)
                .WithMessage("درخواست رد شد");
        }
    }
}