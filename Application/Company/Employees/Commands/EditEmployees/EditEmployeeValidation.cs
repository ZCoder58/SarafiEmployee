using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Company.Employees.Commands.EditEmployees
{
    public class EditEmployeeValidation:AbstractValidator<EditEmployeeCommand>
    {
        public EditEmployeeValidation(IApplicationDbContext dbContext)
        {
            RuleFor(a => a.City)
                .NotNull().WithMessage("نام شهر ضروری میباشد"); 
            RuleFor(a => a.DetailedAddress)
                .NotNull().WithMessage("جزییات آدرس شما ضروری میباشد");
            RuleFor(a => a.Name)
                .NotNull().WithMessage("نام شما ضروری میباشد");
            RuleFor(a => a.Phone)
                .NotNull().WithMessage("شماره تماس شما ضروری میباشد");
            RuleFor(a => a.FatherName)
                .NotNull().WithMessage("ولد شما ضروری میباشد");
            RuleFor(a => a.CountryId)
                .NotNull().WithMessage("انتخاب کشور شما ضروری میباشد");
            RuleFor(a => a.PhotoFile)
                .Must(photoFile => photoFile.IsNull() || photoFile.IsPhoto()).WithMessage("لطفا یک تصویر انتخاب کنید");
        }
    }
}