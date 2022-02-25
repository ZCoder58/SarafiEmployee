using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Statics;
using Application.Customer.Friend.Commands.CreateFriendRequest;
using Application.Customer.Friend.DTOs;
using Application.Customer.Friend.EventHandlers;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Friend.Commands.SendFriendRequest
{
    public class SendFriendRequestHandler : IRequestHandler<SendFriendRequestCommand,RequestDto>
    {
        private readonly IHttpUserContext _httpUserContext;
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;

        public SendFriendRequestHandler(IHttpUserContext httpUserContext, IApplicationDbContext dbContext, IMediator mediator)
        {
            _httpUserContext = httpUserContext;
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<RequestDto> Handle(SendFriendRequestCommand request, CancellationToken cancellationToken)
        {
            var newRequest=await _mediator.Send(new CreateFriendRequestCommand(
                _httpUserContext.GetCurrentUserId().ToGuid(),
                request.CustomerId,
                false,
                false,
                FriendRequestStates.Received,
                FriendRequestStates.Pending),cancellationToken);
            await _mediator.Publish(new FriendRequestSent(request.CustomerId), cancellationToken);
            return new RequestDto()
            {
                State = newRequest.State,
            };
        }
    }
}