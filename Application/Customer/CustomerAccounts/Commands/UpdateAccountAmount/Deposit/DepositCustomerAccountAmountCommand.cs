using System;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit
{
    public record DepositCustomerAccountAmountCommand(
        Guid Id,
        double Amount,
        string Comment) : IRequest;
}