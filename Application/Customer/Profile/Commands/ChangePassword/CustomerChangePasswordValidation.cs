using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Profile.Commands.ChangePassword
{
    public class CustomerChangePasswordValidation:AbstractValidator<CustomerChangePasswordCommand>
    {
        public CustomerChangePasswordValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.CurrentPassword)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("رمز عبور فعلی ضروری میباشد")
                .Must(currentPassword=>dbContext.Customers.IsValidUserPassword(currentPassword,httpUserContext.GetCurrentUserId().ToGuid())).WithMessage("رمز عبور فعلی درست نمیباشد");
            RuleFor(a => a.NewPassword)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("رمز عبور جدید ضروری میباشد")
                .MinimumLength(8).WithMessage("کمتر از 8 حرف مجاز نیست");
        }
    }
}