using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Friend.DTOs;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Friend.Commands.ApproveFriendRequest
{
    public class ApproveFriendRequestHandler : IRequestHandler<ApproveFriendRequestCommand, RequestDto>
    {
        private readonly IApplicationDbContext _dbContext;

        public ApproveFriendRequestHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<RequestDto> Handle(ApproveFriendRequestCommand request, CancellationToken cancellationToken)
        {
            var targetRequest = _dbContext.Friends.GetById(request.FriendId);
            var targetRequestReverse = await _dbContext.Friends.AddAsync(new Domain.Entities.Friend()
            {
                CustomerId = targetRequest.CustomerFriendId.ToString().ToGuid(),
                CustomerFriendId = targetRequest.CustomerId,
                CustomerFriendApproved = true
            }, cancellationToken);
            targetRequest.CustomerFriendApproved = true;
            await _dbContext.SaveChangesAsync(cancellationToken);
            return new RequestDto()
            {
                State = FriendRequestTypes.Approved,
                RequestId = targetRequestReverse.Entity.Id
            };
        }
    }
}