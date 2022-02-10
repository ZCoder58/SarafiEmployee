using System.Threading;
using System.Threading.Tasks;
using Domain.Interfaces.IHubs.IAccessors;
using MediatR;

namespace Application.Customer.Transfers.EventHandlers
{
    public record TransferCompleted : INotification;

    public class TransferCompletedHandler:INotificationHandler<TransferCompleted>
    {
        private readonly INotifyHubAccessor _notifyHub;

        public TransferCompletedHandler(INotifyHubAccessor notifyHub)
        {
            _notifyHub = notifyHub;
        }

        public async Task Handle(TransferCompleted notification, CancellationToken cancellationToken)
        {
            await _notifyHub.NotifySelfAsync("حواله موفقانه اجرا شد", "success");
        }
    }
}