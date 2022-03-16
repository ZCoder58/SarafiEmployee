using System;
using MediatR;

namespace Application.Customer.Balances.Commands.CreateTalab
{
    public record CCreateTalabCommand(Guid CustomerId,
        Guid CustomerFriendId,
        Guid RateCountryId,
        double Amount,
        string Comment,
        bool EnableTransaction=true,
        Guid? TransferId=null) : IRequest;
}