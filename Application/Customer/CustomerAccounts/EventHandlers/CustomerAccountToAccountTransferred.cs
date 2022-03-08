using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Interfaces.IHubs.IAccessors;
using MediatR;

namespace Application.Customer.CustomerAccounts.EventHandlers
{
    public record CustomerAccountToAccountTransferred(Guid CustomerReceiverId,Guid TransactionId) : INotification;

    public class CustomerAccountToAccountTransferredHandler:INotificationHandler<CustomerAccountToAccountTransferred>
    {
        private readonly INotifyHubAccessor _notifyHubAccessor;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IApplicationDbContext _dbContext;
        public CustomerAccountToAccountTransferredHandler(INotifyHubAccessor notifyHubAccessor, IHttpUserContext httpUserContext, IApplicationDbContext dbContext)
        {
            _notifyHubAccessor = notifyHubAccessor;
            _httpUserContext = httpUserContext;
            _dbContext = dbContext;
        }

        public async Task Handle(CustomerAccountToAccountTransferred notification, CancellationToken cancellationToken)
        {
            var sender = _dbContext.Customers.GetById(_httpUserContext.GetCurrentUserId().ToGuid());
           await _dbContext.CustomerNotifications.AddAsync(new CustomerNotification()
           {
               BaseId = notification.TransactionId,
               CustomerId = notification.CustomerReceiverId,
               Title = "تایید دریافت پول",
               Type = NotificationTypes.AccountToAccountTransfer,
               Body = string.Concat(sender.Name," ",sender.FatherName," ","به حساب شما پول انتقال داد")
           },cancellationToken);
           await _dbContext.SaveChangesAsync(cancellationToken);
           await _notifyHubAccessor.UpdateNotificationUser(notification.CustomerReceiverId);
        }
    }
}