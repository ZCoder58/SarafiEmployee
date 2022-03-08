using System;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.WithdrawalTransfer
{
    public record WithdrawalTransferCustomerAccountAmountCommand(
        Guid CustomerAccountId,
        double Amount,
        string Comment,
        Guid TransferId) : IRequest;
}