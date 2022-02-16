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
    public record FriendRequestApproved(Guid TargetCustomerId) : INotification;

    public class FriendRequestApprovedHandler:INotificationHandler<FriendRequestApproved>
    {
        private readonly INotifyHubAccessor _notifyAccessor;
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        public FriendRequestApprovedHandler(INotifyHubAccessor notifyAccessor, IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _notifyAccessor = notifyAccessor;
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public async Task Handle(FriendRequestApproved notification, CancellationToken cancellationToken)
        {
            var senderCustomer = _dbContext.Customers.GetById(_httpUserContext.GetCurrentUserId().ToGuid());
            await _dbContext.CustomerNotifications.AddAsync(new CustomerNotification()
            {
                Body = string.Concat(senderCustomer.Name," ",senderCustomer.LastName, " درخواست همکاری شما را پذیرفت"),
                Title = "قبول همکاری",
                Type = "request",
                CustomerId = notification.TargetCustomerId,
                BaseId = senderCustomer.Id
            },cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _notifyAccessor.UpdateFriendsRequestCount(senderCustomer.Id);
            await _notifyAccessor.UpdateNotificationUser(notification.TargetCustomerId);
        }
    }
}