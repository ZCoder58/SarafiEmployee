using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using FluentValidation;

namespace Application.SubCustomers.Commands.EditSubCustomerAccount
{
    public class EditSubCustomerValidation:AbstractValidator<EditSubCustomerCommand>
    {
        public EditSubCustomerValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.Id)
                .Cascade(CascadeMode.Stop)
                .NotEqual(Guid.Empty).WithMessage("ای دی ضروری میباشد")
                .Must(id => dbContext.SubCustomerAccounts.Any(a =>
                    a.CustomerId == httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.Id == id)).WithMessage("مشتری نامعتبر");
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
                .Must((model, codeNumber) => !dbContext.SubCustomerAccounts
                    .Any(a => a.CodeNumber == codeNumber &&
                    a.Id != model.Id)).WithMessage("کد نمبر قبلا استفاده شده است");
        }
    }
}