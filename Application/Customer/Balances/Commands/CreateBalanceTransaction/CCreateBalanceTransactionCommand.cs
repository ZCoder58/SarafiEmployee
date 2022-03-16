using System;
using MediatR;

namespace Application.Customer.Balances.Commands.CreateBalanceTransaction
{
    public record CCreateBalanceTransactionCommand(
        Guid CustomerBalanceId,
        int Type,
        double Amount,
        string Comment,
        string PriceName,
        Guid? TransferId=null) : IRequest;
}