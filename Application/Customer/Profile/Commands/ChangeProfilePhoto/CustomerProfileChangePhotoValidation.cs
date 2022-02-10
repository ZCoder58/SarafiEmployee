using Application.Common.Extensions;
using FluentValidation;

namespace Application.Customer.Profile.Commands.ChangeProfilePhoto
{
    public class CustomerProfileChangePhotoValidation:AbstractValidator<CustomerProfileChangePhotoCommand>
    {
        public CustomerProfileChangePhotoValidation()
        {
            RuleFor(a => a.PhotoFile)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("انتخاب تصویر ضروری میباشد")
                .Must(filePhoto => filePhoto.IsPhoto()).WithMessage("لطفا یک تصویر انتخاب کنید");
        }
    }
}