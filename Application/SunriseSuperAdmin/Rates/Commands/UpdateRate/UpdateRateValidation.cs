using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using FluentValidation;

namespace Application.SunriseSuperAdmin.Rates.Commands.UpdateRate
{
    public class UpdateRateValidation:AbstractValidator<UpdateRateCommand>
    {
        public UpdateRateValidation(IApplicationDbContext dbContext)
        {
            RuleFor(a => a.Abbr)
                .NotNull().WithMessage("مخفف ارز ضروری میباشد");
            RuleFor(a => a.Id)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("ای دی ضروری میباشد")
                .Must(a => dbContext.RatesCountries.IsExists(a)).WithMessage("ارز پیدا نشد");
            RuleFor(a => a.FaName)
                .NotNull().WithMessage("نام کشور ضروری میباشد");
            RuleFor(a => a.PriceName)
                .NotNull().WithMessage("نام ارز ضروری میباشد");
            RuleFor(a => a.FlagPhotoFile)
                .Must(a => a.IsNull() || a.IsPhoto()).WithMessage("لطفا تصویر یک پرچم انتخاب کنید");
        }
    }
}