using System.Threading;
using System.Threading.Tasks;
using Domain.Interfaces.IHubs.IAccessors;
using MediatR;

namespace Application.SunriseSuperAdmin.Rates.EventHandlers
{
    public record RateAdded : INotification;
    public class RateAddedHandler:INotificationHandler<RateAdded>
    {
        private readonly INotifyHubAccessor _notifyHub;

        public RateAddedHandler(INotifyHubAccessor notifyHub)
        {
            _notifyHub = notifyHub;
        }

        public async Task Handle(RateAdded notification, CancellationToken cancellationToken)
        {
            await _notifyHub.NotifySelfAsync("ارز موفقانه اضافه شد","success");
        }
    }
}