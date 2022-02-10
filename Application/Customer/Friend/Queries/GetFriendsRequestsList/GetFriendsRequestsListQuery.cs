using Application.Common.Models;
using Application.Customer.Friend.DTOs;
using MediatR;

namespace Application.Customer.Friend.Queries.GetFriendsRequestsList
{
    public record GetFriendsRequestsListQuery(TableFilterModel Model) : IRequest<PaginatedList<FriendRequestDTo>>;
}