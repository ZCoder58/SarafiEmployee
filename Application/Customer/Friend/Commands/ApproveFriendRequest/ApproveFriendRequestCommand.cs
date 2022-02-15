using System;
using Application.Customer.Friend.DTOs;
using MediatR;

namespace Application.Customer.Friend.Commands.ApproveFriendRequest
{
    public record ApproveFriendRequestCommand(Guid CustomerId) : IRequest<RequestDto>;
}