using System;
using MediatR;

namespace Application.Customer.Balances.Commands.RollbackAmount
{
    public record RollbackBalanceAmountCommand(Guid CustomerId,
        Guid CustomerFriendId,
        Guid RatesCountryId,
        double Amount,
        int Type) :
        IRequest;
    
}