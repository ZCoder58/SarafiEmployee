using System;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.Withdrawal
{
    public record CWithdrawalMyAccountCommand(
        Guid RateCountryId,
        double Amount,
        string Comment) : IRequest;
}