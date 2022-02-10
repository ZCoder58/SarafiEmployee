using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Friend.DTOs;
using Application.Customer.Friend.Extensions;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Friend.Commands.CancelFriendRequest
{
    public class CancelFriendRequestHandler:IRequestHandler<CancelFriendRequestCommand,RequestDto>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;

        public CancelFriendRequestHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public async Task<RequestDto> Handle(CancelFriendRequestCommand request, CancellationToken cancellationToken)
        {
            var targetFriendRequest = _dbContext.Friends.GetById(request.FriendId);
            _dbContext.Friends.Remove(targetFriendRequest);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return new RequestDto()
            {
                State = FriendRequestTypes.NotSend
            };
        }
    }
}