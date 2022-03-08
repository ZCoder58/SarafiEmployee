using System;
using System.Linq;
using Application.Common.Extensions;
using Application.SubCustomers.Commands.Transactions.CreateTransaction;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.CustomerAccounts.Commands.Transactions.CreateTransaction
{
    public class CreateCustomerTransactionValidation : AbstractValidator<CreateCustomerTransactionCommand>
    {
        public CreateCustomerTransactionValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
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
            RuleFor(a => a.TransferId)
                .Must(transferId => transferId == null ||
                                    transferId == Guid.Empty ||
                                    dbContext.Transfers.Any(a =>
                                        a.SenderId == httpUserContext.GetCurrentUserId().ToGuid() &&
                                        a.Id == transferId)).WithMessage("حواله یافت نشد");
        }
    }
}