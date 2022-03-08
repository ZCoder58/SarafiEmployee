using Application.Common.Extensions;
using Application.Company.Agencies.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Company.Agencies.Commands.EditAgency
{
    public class EditAgencyValidation:AbstractValidator<EditAgencyCommand>
    {
        public EditAgencyValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.Id)
                .NotNull()
                .NotEmpty().WithMessage("ای دی ضروری میباشد")
                .Must(id => dbContext.CompanyAgencies.IsExistById(id, httpUserContext.GetCompanyId().ToGuid()))
                .WithMessage("نمایندگی نامعتبر");
            RuleFor(a => a.Name)
                .NotNull().WithMessage("نام نمایندگی ضروری میباشد")
                .Must((model, name) =>
                    !dbContext.CompanyAgencies.IsExistByName(name, httpUserContext.GetCompanyId().ToGuid(), model.Id))
                .WithMessage("قبلا این نمایندگی اضافه شده است");
        }
    }
}