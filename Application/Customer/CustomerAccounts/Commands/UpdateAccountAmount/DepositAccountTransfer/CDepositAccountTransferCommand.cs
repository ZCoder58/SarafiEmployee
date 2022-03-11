using System;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.DepositAccountTransfer
{
    public record CDepositAccountTransferCommand(
        bool IsMyAccount,
        Guid RateCountryId,
        double Amount,
        string Comment,
        Guid TransferId,
        bool EnableTransaction=true,
        Guid? CustomerId = null) : IRequest;
}