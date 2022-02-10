using System.Threading;
using System.Threading.Tasks;
using Domain.Interfaces.IHubs.IAccessors;
using MediatR;

namespace Application.Customer.Profile.EventHandlers
{
    public record CustomerProfilePhotoChanged : INotification;
    public class CustomerProfilePhotoChangedHandler:INotificationHandler<CustomerProfilePhotoChanged>
    {
        private readonly INotifyHubAccessor _notifyHubAccessor;

        public CustomerProfilePhotoChangedHandler(INotifyHubAccessor notifyHubAccessor)
        {
            _notifyHubAccessor = notifyHubAccessor;
        }

        public async Task Handle(CustomerProfilePhotoChanged notification, CancellationToken cancellationToken)
        {
            await _notifyHubAccessor.NotifySelfAsync("تغیرات موفقانه اعمال شد", "success");
        }
    }
}