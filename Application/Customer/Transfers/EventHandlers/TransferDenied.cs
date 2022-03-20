using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Interfaces.IHubs.IAccessors;
using MediatR;

namespace Application.Customer.Transfers.EventHandlers
{
    public record TransferDenied(Guid DeniedTransferId) : INotification;
    public class TransferDeniedHandler:INotificationHandler<TransferDenied>
    {
        private readonly INotifyHubAccessor _notifyHub;
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;

        public TransferDeniedHandler(INotifyHubAccessor notifyHub, IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _notifyHub = notifyHub;
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public async Task Handle(TransferDenied notification, CancellationToken cancellationToken)
        {
            var targetTransfer = _dbContext.Transfers.GetById(notification.DeniedTransferId);
            var receiver = _dbContext.Customers.GetById(targetTransfer.ReceiverId.ToGuid());
            await _dbContext.CustomerNotifications.AddAsync(new CustomerNotification()
            {
                Title = "رد حواله",
                Body = string.Concat(receiver.Name," ",receiver.LastName," حواله شما را رد کرد"),
                CustomerId = targetTransfer.SenderId,
                Type = "deniedTransfer",
                BaseId = notification.DeniedTransferId
            },cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _notifyHub.UpdateNotificationUser(targetTransfer.SenderId);
        }
    }
}