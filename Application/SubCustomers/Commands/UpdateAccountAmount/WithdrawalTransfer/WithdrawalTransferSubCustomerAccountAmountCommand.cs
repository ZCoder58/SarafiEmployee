using System;
using MediatR;

namespace Application.SubCustomers.Commands.UpdateAccountAmount.WithdrawalTransfer
{
    public record WithdrawalTransferSubCustomerAccountAmountCommand(
        Guid SubCustomerId,
        Guid SubCustomerAccountRateId,
        double Amount,
        string Comment,
        Guid TransferId) : IRequest;
}