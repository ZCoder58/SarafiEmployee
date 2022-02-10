using System.Collections.Generic;
using System.Linq;
using Application.Common.Models;
using Application.Customer.Friend.DTOs;
using MediatR;

namespace Application.Customer.Friend.Queries.GetFriendsList
{
    public record GetFriendsListQuery : IRequest<IEnumerable<FriendsListDTo>>;
    
}