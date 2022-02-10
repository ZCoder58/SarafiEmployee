using System;
using Application.Customer.Friend.DTOs;
using MediatR;

namespace Application.Customer.Friend.Commands.DeleteFriendRequest
{
    public record DeleteFriendRequestCommand(Guid FriendId) : IRequest<RequestDto>;
}