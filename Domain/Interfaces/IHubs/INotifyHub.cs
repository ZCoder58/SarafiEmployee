
using System.Threading.Tasks;

namespace Domain.Interfaces.IHubs
{
    public interface INotifyHub
    {
        Task ReceiveNotify(string message,string notifyType);
        Task UpdateNotifications();
        Task UpdateRequestsCount();
    }
}