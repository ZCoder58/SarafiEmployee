using System;
using MediatR;

namespace Application.Customer.Friend.Queries.GetFriendProfile
{
    public record GetFriendProfileQuery(Guid FriendId) : IRequest;
}