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
    public record FriendRequestDenied(Guid TargetCustomerId) : INotification;

    public class FriendRequestDeniedHandler:INotificationHandler<FriendRequestDenied>
    {
        private readonly INotifyHubAccessor _notifyAccessor;
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        public FriendRequestDeniedHandler(INotifyHubAccessor notifyAccessor, IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _notifyAccessor = notifyAccessor;
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public async Task Handle(FriendRequestDenied notification, CancellationToken cancellationToken)
        {
            var senderCustomer = _dbContext.Customers.GetById(_httpUserContext.GetCurrentUserId().ToGuid());
            await _dbContext.CustomerNotifications.AddAsync(new CustomerNotification()
            {
                Body = string.Concat(senderCustomer.Name," ",senderCustomer.LastName, " درخواست همکاری شما را رد کرد"),
                Title = "رد همکاری",
                Type = "request",
                CustomerId = notification.TargetCustomerId,
                BaseId = senderCustomer.Id
            },cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _notifyAccessor.UpdateNotificationUser(notification.TargetCustomerId);
        }
    }
}