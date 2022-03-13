using System.Threading;
using System.Threading.Tasks;
using Domain.Interfaces;
using Domain.Interfaces.IHubs.IAccessors;
using MediatR;

namespace Application.Customer.CurrencyByAndSell.EventHandlers
{
    public record ExchangeMoneyDoneEvent : INotification;

    public class ExchangeMoneyDoneHandler:INotificationHandler<ExchangeMoneyDoneEvent>
    {
        private readonly IHttpUserContext _httpUserContext;
        private readonly INotifyHubAccessor _notifyHub;

        public ExchangeMoneyDoneHandler(IHttpUserContext httpUserContext, INotifyHubAccessor notifyHub)
        {
            _httpUserContext = httpUserContext;
            _notifyHub = notifyHub;
        }

        public async Task Handle(ExchangeMoneyDoneEvent notification, CancellationToken cancellationToken)
        {
            await  _notifyHub.NotifySelfAsync("معامله موفقانه انجام شد", "success");
        }
    }
}