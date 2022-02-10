using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Friend.DTOs;
using Application.Customer.Friend.Extensions;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Friend.Commands.DeleteFriendRequest
{
    public class DeleteFriendRequestHandler:IRequestHandler<DeleteFriendRequestCommand,RequestDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;

        public DeleteFriendRequestHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public async Task<RequestDto> Handle(DeleteFriendRequestCommand request, CancellationToken cancellationToken)
        {
            var targetFriendRequest = _dbContext.Friends.GetById(request.FriendId);
            var targetFriendRequestReverse = _dbContext.Friends.GetFriendRequest(
                targetFriendRequest.CustomerFriendId.ToString().ToGuid(),
                targetFriendRequest.CustomerId);
            _dbContext.Friends.Remove(targetFriendRequest);
            _dbContext.Friends.Remove(targetFriendRequestReverse);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return new RequestDto()
            {
                State = FriendRequestTypes.NotSend
            };
        }
    }
}