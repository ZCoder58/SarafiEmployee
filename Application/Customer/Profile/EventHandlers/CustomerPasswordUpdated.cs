using System.Threading;
using System.Threading.Tasks;
using Domain.Interfaces.IHubs.IAccessors;
using MediatR;

namespace Application.Customer.Profile.EventHandlers
{
    public record CustomerPasswordUpdated : INotification;
    public class CustomerPasswordUpdatedHandler:INotificationHandler<CustomerPasswordUpdated>
    {
        private readonly INotifyHubAccessor _notifyHubAccessor;

        public CustomerPasswordUpdatedHandler(INotifyHubAccessor notifyHubAccessor)
        {
            _notifyHubAccessor = notifyHubAccessor;
        }

        public async Task Handle(CustomerPasswordUpdated notification, CancellationToken cancellationToken)
        {
            await _notifyHubAccessor.NotifySelfAsync("رمز عبور شما موفقانه تغیر یافت", "success");
        }
    }
}