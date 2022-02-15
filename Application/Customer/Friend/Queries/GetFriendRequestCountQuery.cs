using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Statics;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Friend.Queries
{
    public record GetFriendRequestCountQuery : IRequest<int>;

    public class GetFriendRequestCountHandler:IRequestHandler<GetFriendRequestCountQuery,int>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;

        public GetFriendRequestCountHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public Task<int> Handle(GetFriendRequestCountQuery request, CancellationToken cancellationToken)
        {
            return Task.FromResult(_dbContext.Friends.Count(a =>
                a.CustomerFriendId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                !a.CustomerFriendApproved &&
                a.State==FriendRequestStates.Pending));
        }
    }
}