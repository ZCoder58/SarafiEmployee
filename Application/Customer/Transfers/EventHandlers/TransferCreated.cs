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
    public record TransferCreated(Guid ReceiverId,Guid NewTransferId) : INotification;
    public class TransferCreatedHandler:INotificationHandler<TransferCreated>
    {
        private readonly INotifyHubAccessor _notifyHub;
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;

        public TransferCreatedHandler(INotifyHubAccessor notifyHub, IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _notifyHub = notifyHub;
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public async Task Handle(TransferCreated notification, CancellationToken cancellationToken)
        {
            var sender = _dbContext.Customers.GetById(_httpUserContext.GetCurrentUserId().ToGuid());
            //send self notific 
            await _notifyHub.NotifySelfAsync("حواله جدید موفقانه اضافه شد","success");
            await _dbContext.CustomerNotifications.AddAsync(new CustomerNotification()
            {
                Title = "حواله جدید",
                Body = string.Concat("حواله جدید از ",sender.Name," ",sender.LastName),
                CustomerId = notification.ReceiverId,
                Type = "newTransfer",
                BaseId = notification.NewTransferId
            },cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _notifyHub.UpdateNotificationUser(notification.ReceiverId);
        }
    }
}