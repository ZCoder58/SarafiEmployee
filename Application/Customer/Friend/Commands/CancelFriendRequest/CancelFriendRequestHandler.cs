using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Friend.DTOs;
using Application.Customer.Friend.EventHandlers;
using Application.Customer.Friend.Extensions;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Friend.Commands.CancelFriendRequest
{
    public class CancelFriendRequestHandler:IRequestHandler<CancelFriendRequestCommand,RequestDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMediator _mediator;

        public CancelFriendRequestHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mediator = mediator;
        }

        public async Task<RequestDto> Handle(CancelFriendRequestCommand request, CancellationToken cancellationToken)
        {
            var targetFriendRequest = _dbContext.Friends.GetFriendRequest(_httpUserContext.GetCurrentUserId().ToGuid(),request.CustomerId);
            var reverseRequest = _dbContext.Friends.GetFriendRequest(
                targetFriendRequest.CustomerFriendId.ToGuid(),targetFriendRequest.CustomerId);
            _dbContext.Friends.Remove(targetFriendRequest);
            _dbContext.Friends.Remove(reverseRequest);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new FriendRequestCanceled(targetFriendRequest.CustomerFriendId.ToGuid()),
                cancellationToken);
            return new RequestDto()
            {
                State = FriendRequestStates.NotSend
            };
        }
    }
}