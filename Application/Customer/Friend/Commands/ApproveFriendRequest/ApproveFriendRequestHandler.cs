using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Friend.DTOs;
using Application.Customer.Friend.Extensions;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Friend.Commands.ApproveFriendRequest
{
    public class ApproveFriendRequestHandler : IRequestHandler<ApproveFriendRequestCommand, RequestDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        public ApproveFriendRequestHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public async Task<RequestDto> Handle(ApproveFriendRequestCommand request, CancellationToken cancellationToken)
        {
            var targetRequest = _dbContext.Friends.GetFriendRequest(_httpUserContext.GetCurrentUserId().ToGuid(),request.CustomerId);
            targetRequest.CustomerFriendApproved = true;
            targetRequest.State = FriendRequestStates.Approved;
            var targetRequestReverse =
                _dbContext.Friends.GetFriendRequest(request.CustomerId, _httpUserContext.GetCurrentUserId().ToGuid());
            targetRequestReverse.CustomerFriendApproved = true;
            targetRequestReverse.State = FriendRequestStates.Approved;
            await _dbContext.SaveChangesAsync(cancellationToken);
            return new RequestDto()
            {
                State = targetRequest.State
            };
        }
    }
}