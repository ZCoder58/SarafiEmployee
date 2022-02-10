using System;
using MediatR;

namespace Application.Customer.Friend.Commands.DenyFriendRequest
{
    public record DenyFriendRequestCommand(Guid FriendId) : IRequest;
}