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
    public class RollbackCustomerTransactionValidation : AbstractValidator<RollbackCustomerTransactionCommand>
    {
        public RollbackCustomerTransactionValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.TransactionId)
                .NotEqual(Guid.Empty).WithMessage("ای دی ضروری میباشد")
                .Must((model, transactionId) => dbContext.CustomerAccountTransactions
                    .Include(a=>a.CustomerAccount).Any(a
                        => model.AllowTransferRollback || 
                           ( a.TransactionType != TransactionTypes.Transfer &&
                                                            a.TransactionType != TransactionTypes.ReceivedFromAccount &&
                                                            a.CustomerAccount.CustomerId ==
                                                            httpUserContext.GetCurrentUserId().ToGuid() &&
                                                            a.CreatedDate.Value.Date >= DateTime.UtcNow.AddDays(-2).Date &&
                                                            a.Id == transactionId))).WithMessage("درخواست نامعتبر");
        }
    }
}