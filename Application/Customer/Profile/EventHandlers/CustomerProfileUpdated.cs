using System.Threading;
using System.Threading.Tasks;
using Domain.Interfaces.IHubs.IAccessors;
using MediatR;

namespace Application.Customer.Profile.EventHandlers
{
    public record CustomerProfileUpdated : INotification;
    public class CustomerProfileUpdatedHandler:INotificationHandler<CustomerProfileUpdated>
    {
        private readonly INotifyHubAccessor _notifyHubAccessor;

        public CustomerProfileUpdatedHandler(INotifyHubAccessor notifyHubAccessor)
        {
            _notifyHubAccessor = notifyHubAccessor;
        }

        public async Task Handle(CustomerProfileUpdated notification, CancellationToken cancellationToken)
        {
            await _notifyHubAccessor.NotifySelfAsync("اطلاعات شما موفقانه ویرایش شد", "success");
        }
    }
}