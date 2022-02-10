using Application.Common.Models;
using Application.Customer.Friend.DTOs;
using MediatR;

namespace Application.Customer.Friend.Queries.GetFriendsListTable
{
    public record GetFriendsListTableQuery(TableFilterModel Model) : IRequest<PaginatedList<FriendsListDTo>>;
    
}