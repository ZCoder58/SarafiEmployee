using System;
using System.Linq;
using Application.Common.Extensions;
using Application.SubCustomers.Commands.Transactions.RollbackTransaction;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.CustomerAccounts.Commands.Transactions.RollbackTransaction
{
    public class CRollbackTransactionValidation : AbstractValidator<CRollbackTransactionCommand>
    {
        public CRollbackTransactionValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.TransactionId)
                .NotEqual(Guid.Empty).WithMessage("ای دی ضروری میباشد")
                .Must((model, transactionId) => 
                    dbContext.CustomerAccountTransactions
                    .Include(a=>a.CustomerAccount).Any(a
                        => a.Id==transactionId &&
                            a.CustomerAccount.CustomerId == httpUserContext.GetCurrentUserId().ToGuid() &&
                            ((a.TransactionType != TransactionTypes.Transfer &&
                              a.TransactionType != TransactionTypes.TransferComplete
                                ) || model.EnableTransferRollback)))
                .WithMessage("درخواست نامعتبر");
        }
    }
}