using Application.Common.Extensions;
using Application.Company.Agencies.Extensions;
using Domain.Interfaces;
using FluentValidation;
namespace Application.Company.Agencies.Commands.CreateAgency
{
    public class CreateAgencyValidation:AbstractValidator<CreateAgencyCommand>
    {
        public CreateAgencyValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.Name)
                .NotNull().WithMessage("نام نمایندگی ضروری است")
                .Must(name=>!dbContext.CompanyAgencies.IsExistByName(name,httpUserContext.GetCompanyId().ToGuid()))
                .WithMessage("این نمایندگی قبلا اضافه شده است");
        }
    }
}