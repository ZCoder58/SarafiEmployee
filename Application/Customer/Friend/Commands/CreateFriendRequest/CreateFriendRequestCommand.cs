using System;
using MediatR;
namespace Application.Customer.Friend.Commands.CreateFriendRequest
{
    public record CreateFriendRequestCommand(
        Guid WhoCustomerId,
        Guid WithCustomerId,
        bool WhoCustomerFriendApproved,
        bool WithCustomerFriendApproved,
        int WithState,
        int WhoState) : IRequest<Domain.Entities.Friend>;
}