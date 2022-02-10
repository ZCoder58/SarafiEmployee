using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Statics;
using Domain.Interfaces;
using Domain.Interfaces.IHubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Application.Common.Hubs
{
    [Authorize]
    public class NotifyHub:Hub<INotifyHub>
    {
        private readonly IHttpUserContext _httpUserContext;

        public NotifyHub(IHttpUserContext httpUserContext)
        {
            _httpUserContext = httpUserContext;
        }

        public override Task OnConnectedAsync()
        {
            
            return base.OnConnectedAsync();
        }
    }
}