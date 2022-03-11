using System;
using Application.SubCustomers.Statics;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit
{
    public record CDepositAccountCommand(
        bool IsMyAccount,
        Guid AccountRateId,
        double Amount,
        string Comment,
        bool EnableTransaction=true,
        Guid? CustomerId=null) : IRequest;
}