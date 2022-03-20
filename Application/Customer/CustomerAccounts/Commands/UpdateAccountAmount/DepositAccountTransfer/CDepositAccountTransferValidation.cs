using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit;
using Application.Customer.CustomerAccounts.Extensions;
using Application.Customer.Transfers.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.DepositAccountTransfer
{
    public class CDepositAccountTransferValidation:AbstractValidator<CDepositAccountTransferCommand>
    {
        public CDepositAccountTransferValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.RateCountryId)
                .NotEqual(Guid.Empty).WithMessage("ای دی اکانت ضروری میباشد");
            RuleFor(a => a.TransferId)
                .Cascade(CascadeMode.Stop)
                .Must(transferId => dbContext.Transfers.IsSender(httpUserContext.GetCurrentUserId().ToGuid(),transferId))
                .WithMessage("حواله نامعتبر");
            RuleFor(a => a.Amount)
                .NotNull().WithMessage("مقدار پول ضروری میباشد")
                .GreaterThanOrEqualTo(1).WithMessage("کم تر از 1 مجاز نیست");
        }
    }
}