using System;
using MediatR;

namespace Application.SubCustomers.Commands.UpdateAccountAmount.Withdrawal
{
    public record CsWithdrawalAccountCommand(
        Guid SubCustomerId,
        Guid SubCustomerAccountRateId,
        double Amount,
        string Comment) : IRequest;
}