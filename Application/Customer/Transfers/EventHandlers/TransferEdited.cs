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
    public record TransferEdited: INotification;
    public class TransferEditedHandler:INotificationHandler<TransferEdited>
    {
        private readonly INotifyHubAccessor _notifyHub;

        public TransferEditedHandler(INotifyHubAccessor notifyHub)
        {
            _notifyHub = notifyHub;
        }

        public async Task Handle(TransferEdited notification, CancellationToken cancellationToken)
        {
            await _notifyHub.NotifySelfAsync("تغیرات موفقانه اعمال شد","success");
        }
    }
}