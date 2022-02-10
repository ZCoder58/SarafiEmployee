using System.Threading;
using System.Threading.Tasks;
using Domain.Interfaces.IHubs.IAccessors;
using MediatR;

namespace Application.SunriseSuperAdmin.Rates.EventHandlers
{
    public record RateDeleted : INotification;
    public class RateDeletedHandler:INotificationHandler<RateDeleted>
    {
        private readonly INotifyHubAccessor _notifyHub;

        public RateDeletedHandler(INotifyHubAccessor notifyHub)
        {
            _notifyHub = notifyHub;
        }

        public async Task Handle(RateDeleted notification, CancellationToken cancellationToken)
        {
            await _notifyHub.NotifySelfAsync("ارز موفقانه حذف شد","success");
        }
    }
}