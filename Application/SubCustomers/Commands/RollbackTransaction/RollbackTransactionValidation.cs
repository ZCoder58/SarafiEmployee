using System;
using System.Linq;
using Application.Common.Extensions;
using Domain.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.RollbackTransaction
{
    public class RollbackTransactionValidation:AbstractValidator<RollbackTransactionCommand>
    {
        public RollbackTransactionValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.TransactionId)
                .NotEqual(Guid.Empty).WithMessage("ای دی ضروری میباشد")
                .Must(transactionId => dbContext.SubCustomerTransactions.Include(a => a.SubCustomerAccountRate)
                    .ThenInclude(a => a.SubCustomerAccount).Any(a =>
                        a.SubCustomerAccountRate.SubCustomerAccount.CustomerId ==
                        httpUserContext.GetCurrentUserId().ToGuid() &&
                        a.CreatedDate.Value.Date>=DateTime.UtcNow.AddDays(-2).Date &&
                        a.Id == transactionId)).WithMessage("درخواست نامعتبر");
        }
    }
}