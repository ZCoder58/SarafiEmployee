using System;
using Application.Customer.Friend.DTOs;
using MediatR;

namespace Application.Customer.Friend.Commands.CancelFriendRequest
{
    public record CancelFriendRequestCommand(Guid CustomerId) : IRequest<RequestDto>;
}