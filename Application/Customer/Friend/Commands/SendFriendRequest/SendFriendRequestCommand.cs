using System;
using Application.Customer.Friend.DTOs;
using MediatR;

namespace Application.Customer.Friend.Commands.SendFriendRequest
{
    public record SendFriendRequestCommand(Guid CustomerId) : IRequest<RequestDto>;
}