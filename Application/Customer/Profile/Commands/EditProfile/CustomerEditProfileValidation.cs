using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Profile.Commands.EditProfile
{
    public class CustomerEditProfileValidation:AbstractValidator<CustomerEditProfileCommand>
    {
        public CustomerEditProfileValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.Phone)
                .NotNull().WithMessage("شماره تماس شما ضروری میباشد");
            RuleFor(a => a.UserName)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("نام کاربری شما ضروری میباشد")
                .Must(userName =>
                    dbContext.Customers.IsUniqueUserNameExcept(userName, httpUserContext.GetCurrentUserId().ToGuid()))
                .WithMessage("نام کاربری از قبل وجود دارد");
        }
    }
}