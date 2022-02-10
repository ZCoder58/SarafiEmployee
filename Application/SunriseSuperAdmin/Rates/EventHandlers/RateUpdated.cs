using System.Threading;
using System.Threading.Tasks;
using Domain.Interfaces.IHubs.IAccessors;
using MediatR;

namespace Application.SunriseSuperAdmin.Rates.EventHandlers
{
    public record RateUpdated : INotification;
    public class RateUpdatedHandler:INotificationHandler<RateUpdated>
    {
        private readonly INotifyHubAccessor _notifyHub;

        public RateUpdatedHandler(INotifyHubAccessor notifyHub)
        {
            _notifyHub = notifyHub;
        }

        public async Task Handle(RateUpdated notification, CancellationToken cancellationToken)
        {
            await _notifyHub.NotifySelfAsync("ارز موفقانه ویرایش یافت","success");
        }
    }
}