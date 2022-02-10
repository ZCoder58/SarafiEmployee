using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.Customer.Friend.EventHandlers;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Friend.Commands.DenyFriendRequest
{
    public class DenyFriendRequestHandler:IRequestHandler<DenyFriendRequestCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;

        public DenyFriendRequestHandler(IApplicationDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(DenyFriendRequestCommand request, CancellationToken cancellationToken)
        {
            var targetFriendRequest = _dbContext.Friends.GetById(request.FriendId);
            _dbContext.Friends.Remove(targetFriendRequest);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new FriendRequestDenied(targetFriendRequest.CustomerId),cancellationToken);
            return Unit.Value;
        }
    }
}