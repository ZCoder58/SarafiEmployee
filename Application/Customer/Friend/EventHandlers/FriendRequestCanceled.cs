using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Interfaces.IHubs.IAccessors;
using MediatR;

namespace Application.Customer.Friend.EventHandlers
{
    public record FriendRequestCanceled(Guid TargetCustomerId) : INotification;

    public class FriendRequestCanceledHandler:INotificationHandler<FriendRequestCanceled>
    {
        private readonly INotifyHubAccessor _notifyAccessor;
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        public FriendRequestCanceledHandler(INotifyHubAccessor notifyAccessor, IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _notifyAccessor = notifyAccessor;
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public async Task Handle(FriendRequestCanceled notification, CancellationToken cancellationToken)
        {
            await _notifyAccessor.UpdateFriendsRequestCount(notification.TargetCustomerId);
        }
    }
}