using System;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.Deposit
{
    public record CDepositMyAccountCommand(
        Guid RateCountryId,
        double Amount,
        string Comment) : IRequest;
}