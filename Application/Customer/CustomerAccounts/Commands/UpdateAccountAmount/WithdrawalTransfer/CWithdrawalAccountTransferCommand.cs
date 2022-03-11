using System;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.WithdrawalTransfer
{
    public record CWithdrawalAccountTransferCommand(
        bool IsMyAccount,
        Guid RateCountryId,
        double Amount,
        string Comment,
        Guid TransferId,
        bool EnableTransaction=true,
        Guid? CustomerId=null
        ) : IRequest;
}