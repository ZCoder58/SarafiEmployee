using System;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Entities;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.ExchangeRates.Commands.UpdateExchangeRate
{
    public class UpdateExchangeRateValidation:AbstractValidator<UpdateExchangeRateCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        public UpdateExchangeRateValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext=dbContext;
            _httpUserContext = httpUserContext;
            RuleFor(a => a.ExchangeRateId)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("ای دی ضروری میباشد")
                .Must(Exists).WithMessage("نرخ ارز پیدا نشد");
            RuleFor(a => a.FromAmount)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("مقدار ارز ضروری میباشد")
                .GreaterThanOrEqualTo(1).WithMessage("کمتر از 1 مجاز نیست");
            RuleFor(a => a.FromAmount)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("مقدار معادل ضروری میباشد")
                .GreaterThanOrEqualTo(0).WithMessage("کمتر از0 مجاز نیست");

        }

        public bool Exists(Guid exchangeRateId)
        {
            var targetExchangeRate = _dbContext.CustomerExchangeRates.GetById(exchangeRateId);
            return targetExchangeRate.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                   !targetExchangeRate.Reverse &&
                   targetExchangeRate.CreatedDate?.Date.Date ==DateTime.UtcNow.Date;
        }
    }
}