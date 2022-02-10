using Application.Common.Extensions;
using FluentValidation;

namespace Application.SunriseSuperAdmin.Rates.Commands.CreateRate
{
    public class CreateRateValidation:AbstractValidator<CreateRateCommand>
    {
        public CreateRateValidation()
        {
            RuleFor(a => a.Abbr)
                .NotNull().WithMessage("مخفف این ارز ضروری میباشد");
            RuleFor(a => a.FaName)
                .NotNull().WithMessage("نام کشور ضروری میباشد");
            RuleFor(a => a.PriceName)
                .NotNull().WithMessage("نام ارز ضروری میباشد");
            RuleFor(a => a.FlagPhotoFile)
                .NotNull().WithMessage("تصویر بیرق کشور ضروری میباشد")
                .Must(a => a.IsPhoto()).WithMessage("لطفا یک تصویر انتخاب کنید");
        }
    }
}