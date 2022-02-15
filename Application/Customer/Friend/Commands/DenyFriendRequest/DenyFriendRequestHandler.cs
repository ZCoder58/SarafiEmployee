using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Friend.EventHandlers;
using Application.Customer.Friend.Extensions;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Friend.Commands.DenyFriendRequest
{
    public class DenyFriendRequestHandler:IRequestHandler<DenyFriendRequestCommand,int>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;
        private readonly IHttpUserContext _httpUserContext;

        public DenyFriendRequestHandler(IApplicationDbContext dbContext, IMediator mediator, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<int> Handle(DenyFriendRequestCommand request, CancellationToken cancellationToken)
        {
            var targetFriendRequest = _dbContext.Friends.GetFriendRequest(_httpUserContext.GetCurrentUserId().ToGuid(),request.CustomerId);
            var reverseRequest = _dbContext.Friends.GetFriendRequest(targetFriendRequest.CustomerFriendId.ToGuid(),
                targetFriendRequest.CustomerId);
            _dbContext.Friends.Remove(targetFriendRequest);
            _dbContext.Friends.Remove(reverseRequest);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new FriendRequestDenied(reverseRequest.CustomerId),cancellationToken);
            return FriendRequestStates.NotSend;
        }
    }
}