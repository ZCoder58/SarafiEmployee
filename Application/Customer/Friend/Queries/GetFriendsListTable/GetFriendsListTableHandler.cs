using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Models;
using Application.Common.Statics;
using Application.Customer.Friend.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Friend.Queries.GetFriendsListTable
{
    public class GetFriendsListTableHandler:IRequestHandler<GetFriendsListTableQuery,PaginatedList<FriendsListDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        public GetFriendsListTableHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
        }
    
        public  Task<PaginatedList<FriendsListDTo>> Handle(GetFriendsListTableQuery request, CancellationToken cancellationToken)
        {
            var search = request.Model.Search.ToEmptyStringIfNull();
            return _dbContext.Friends
                .Include(a=>a.CustomerFriend)
                .Where(a => a.CustomerId ==_httpUserContext.GetCurrentUserId().ToGuid() &&
                            a.CustomerFriend.UserType!=UserTypes.EmployeeType &&
                            a.CustomerFriendApproved)
                .Where(a=>a.CustomerFriend.Name.Contains(search) ||
                          a.CustomerFriend.LastName.Contains(search) ||
                          a.CustomerFriend.Phone.Contains(search) ||
                          a.CustomerFriend.UserName.Contains(search) ||
                          a.CustomerFriend.DetailedAddress.Contains(search)
                          )
                .OrderDescending()
                .ProjectTo<FriendsListDTo>(_mapper.ConfigurationProvider)
                .ToPaginatedListAsync(request.Model);
        }
    }
}