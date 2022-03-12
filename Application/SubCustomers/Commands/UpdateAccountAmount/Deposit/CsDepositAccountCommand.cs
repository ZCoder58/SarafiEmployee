using System;
using MediatR;

namespace Application.SubCustomers.Commands.UpdateAccountAmount.Deposit
{
    public record CsDepositAccountCommand(
        Guid SubCustomerId,
        Guid SubCustomerAccountRateId,
        double Amount,
        string Comment,
        bool AddToAccount=true) : IRequest;
}