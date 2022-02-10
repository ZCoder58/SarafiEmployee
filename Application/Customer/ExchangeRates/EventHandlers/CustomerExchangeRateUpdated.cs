using System.Threading;
using System.Threading.Tasks;
using Domain.Interfaces.IHubs.IAccessors;
using MediatR;

namespace Application.Customer.ExchangeRates.EventHandlers
{
    public record CustomerExchangeRateUpdated : INotification;
    public class CustomerExchangeRateUpdatedHandler:INotificationHandler<CustomerExchangeRateUpdated>
    {
        private readonly INotifyHubAccessor _notifyHubAccessor;

        public CustomerExchangeRateUpdatedHandler(INotifyHubAccessor notifyHubAccessor)
        {
            _notifyHubAccessor = notifyHubAccessor;
        }

        public async Task Handle(CustomerExchangeRateUpdated notification, CancellationToken cancellationToken)
        {
            await _notifyHubAccessor.NotifySelfAsync("نرخ تبادل ارز موفقانه اعمال شد", "success");
        }
    }
}