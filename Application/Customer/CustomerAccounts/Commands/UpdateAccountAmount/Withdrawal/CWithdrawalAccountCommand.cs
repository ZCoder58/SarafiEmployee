using System;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Withdrawal
{
    public record CWithdrawalAccountCommand(
        bool IsMyAccount,
        Guid RateCountryId,
        double Amount,
        string Comment,
        bool EnableTransaction=true,
        Guid? CustomerId=null
        ) : IRequest;
}