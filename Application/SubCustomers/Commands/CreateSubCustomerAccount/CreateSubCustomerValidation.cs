using System.Linq;
using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using FluentValidation;

namespace Application.SubCustomers.Commands.CreateSubCustomerAccount
{
    public class CreateSubCustomerValidation:AbstractValidator<CreateSubCustomerCommand>
    {
        public CreateSubCustomerValidation(IApplicationDbContext dbContext)
        {
            RuleFor(a => a.Name)
                .NotNull().WithMessage("نام ضروری میباشد");
            RuleFor(a => a.FatherName)
                .NotNull().WithMessage("نام پدر ضروری میباشد");
            RuleFor(a => a.Phone)
                .NotNull().WithMessage("شماره تماس ضروری میباشد");
            RuleFor(a => a.SId)
                .NotNull().WithMessage("شماره تذکره ضروری میباشد");
            RuleFor(a => a.CodeNumber)
                .NotNull().WithMessage("کد نمبر مشتری ضروری میباشد")
                .Must(codeNumber => dbContext.SubCustomerAccounts.Any(a => a.CodeNumber != codeNumber))
                .WithMessage("کد نمبر تکرار است");
        }
    }
}