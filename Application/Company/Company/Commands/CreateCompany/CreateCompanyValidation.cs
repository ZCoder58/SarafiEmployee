using System.Linq;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Company.Company.Commands.CreateCompany
{
    public class CreateCompanyValidation:AbstractValidator<CreateCompanyCommand>
    {
        public CreateCompanyValidation(IApplicationDbContext dbContext)
        {
            RuleFor(a => a.Companyname)
                .NotNull().WithMessage("نام شرکت ضروری میباشد")
                .Must(name=>!dbContext.CompaniesInfos.Any(a=>a.CompanyName==name))
                .WithMessage("نام شرکت قبلا ثبت شده است");
        }
    }
}