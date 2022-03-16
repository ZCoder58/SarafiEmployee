using System;
using MediatR;

namespace Application.Customer.Balances.Commands.CreateRasid
{
    public record CCreateRasidCommand(Guid CustomerId,
        Guid CustomerFriendId,
        Guid RateCountryId,
        double Amount,
        string Comment,
        bool AddToAccount=true) : IRequest;
}