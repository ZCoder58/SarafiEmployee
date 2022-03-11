using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Customer.Transfers.Extensions;
using Application.SubCustomers.Commands.Transactions.CreateTransaction;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.CustomerAccounts.Commands.Transactions.CreateTransaction
{
    public class CCreateTransactionValidation : AbstractValidator<CCreateTransactionCommand>
    {
        public CCreateTransactionValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.CustomerAccountId)
                .NotNull()
                .NotEqual(Guid.Empty).WithMessage("ای دی حساب ارز ضروری میباشد");
            RuleFor(a => a.Amount)
                .NotNull().WithMessage("مقدرا ضروری میباشد")
                .GreaterThanOrEqualTo(1).WithMessage("کمتر از 1 مجاز نیست");
            RuleFor(a => a.PriceName)
                .NotNull().WithMessage("نام ارز ضروری میباشد");
            RuleFor(a => a.TransactionType)
                .NotNull().WithMessage("نوعیت انتقال ضروری میباشد");
      
        }
    }
}