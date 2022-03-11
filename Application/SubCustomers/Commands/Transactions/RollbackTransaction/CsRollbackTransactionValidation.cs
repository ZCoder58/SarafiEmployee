using System;
using System.Linq;
using Application.Common.Extensions;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.Transactions.RollbackTransaction
{
    public class CsRollbackTransactionValidation : AbstractValidator<CsRollbackTransactionCommand>
    {
        public CsRollbackTransactionValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.TransactionId)
                .NotEqual(Guid.Empty).WithMessage("ای دی ضروری میباشد")
                .Must((model, transactionId) => dbContext.SubCustomerTransactions.Include(a => a.SubCustomerAccountRate)
                    .ThenInclude(a => a.SubCustomerAccount).Any(a =>
                        (model.AllowTransferRollback || 
                         (a.TransactionType != TransactionTypes.Transfer &&
                         a.TransactionType != TransactionTypes.TransferComplete &&
                          a.TransactionType != TransactionTypes.TransferWithDebt)) &&
                        a.SubCustomerAccountRate.SubCustomerAccount.CustomerId == httpUserContext.GetCurrentUserId().ToGuid() &&
                        a.Id == transactionId)).WithMessage("درخواست نامعتبر");
        }
    }
}