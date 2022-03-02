using System;
using MediatR;

namespace Application.SubCustomers.Commands.UpdateAccountAmount.Withdrawal
{
    public record WithdrawalSubCustomerAccountAmountCommand(
        Guid SubCustomerId,
        Guid SubCustomerAccountRateId,
        double Amount,
        string Comment,
        Guid? TransferId) : IRequest;
}