using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Company.Agencies.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Company.Employees.Commands.EditEmployees
{
    public class EditEmployeeValidation:AbstractValidator<EditEmployeeCommand>
    {
        public EditEmployeeValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.CompanyAgencyId)
                .NotNull()
                .NotEmpty().WithMessage("انتخاب نمایندگی ضروری میباشد")
                .Must(agencyId=>dbContext.CompanyAgencies.IsExistById(agencyId,
                    httpUserContext.GetCompanyId().ToGuid()))
                .WithMessage("نمایندگی پیدا نشد");
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