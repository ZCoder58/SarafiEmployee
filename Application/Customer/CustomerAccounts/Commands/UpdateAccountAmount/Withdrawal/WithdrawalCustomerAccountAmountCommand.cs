using System;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Withdrawal
{
    public record WithdrawalCustomerAccountAmountCommand(
        Guid CustomerAccountId,
        double Amount,
        string Comment) : IRequest;
}