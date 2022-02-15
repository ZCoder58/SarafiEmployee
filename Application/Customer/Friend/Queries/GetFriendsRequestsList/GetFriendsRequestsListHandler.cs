using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Models;
using Application.Common.Statics;
using Application.Customer.Friend.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Friend.Queries.GetFriendsRequestsList
{
    public class GetFriendsRequestsListHandler:IRequestHandler<GetFriendsRequestsListQuery,PaginatedList<FriendRequestDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;

        public GetFriendsRequestsListHandler(IApplicationDbContext dbContext, IMapper mapper, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
        }

        public async Task<PaginatedList<FriendRequestDTo>> Handle(GetFriendsRequestsListQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.Friends
                .Where(a => a.CustomerFriendId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                            !a.CustomerFriendApproved &&
                            a.State==FriendRequestStates.Pending)
                .ProjectTo<FriendRequestDTo>(_mapper.ConfigurationProvider)
                .ToPaginatedListAsync(request.Model);
        }
    }
}