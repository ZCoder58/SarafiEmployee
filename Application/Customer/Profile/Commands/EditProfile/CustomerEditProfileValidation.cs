using System;
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
            RuleFor(a => a.City)
                .NotNull()
                .WithMessage("نام شهر ضروری میباشد");
            RuleFor(a => a.Name)
                .NotNull().WithMessage("نام شما ضروری میباشد");
            RuleFor(a => a.CountryId)
                .NotEqual(Guid.Empty).WithMessage("انتخاب کشور شما ضروری میباشد")
                .Must(dbContext.Countries.IsExists).WithMessage("کشور وجود ندارد");
            RuleFor(a => a.DetailedAddress)
                .NotNull().WithMessage("جزییات ادرس شما ضروی میباشد");
            RuleFor(a => a.FatherName)
                .NotNull().WithMessage("ولد ضروری میباشد");
        }
    }
}