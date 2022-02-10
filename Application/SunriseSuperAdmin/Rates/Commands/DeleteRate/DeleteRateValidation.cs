using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using FluentValidation;

namespace Application.SunriseSuperAdmin.Rates.Commands.DeleteRate
{
    public class DeleteRateValidation:AbstractValidator<DeleteRateCommand>
    {
        public DeleteRateValidation(IApplicationDbContext dbContext)
        {
            RuleFor(a => a.Id)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("ای دی ضروری میباشد")
                .Must(a => dbContext.RatesCountries.IsExists(a)).WithMessage("ارز پیدا نشد");
        }
    }
}