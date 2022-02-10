using System;
using System.Threading.Tasks;
using Application.Common.Hubs;
using Application.Common.Services.HubsAccessors.Base;
using Domain.Interfaces;
using Domain.Interfaces.IHubs;
using Domain.Interfaces.IHubs.IAccessors;
using Microsoft.AspNetCore.SignalR;

namespace Application.Common.Services.HubsAccessors
{
    public class NotifyHubAccessor:BaseHubAccessor<NotifyHub,INotifyHub>,INotifyHubAccessor
    {
        
        public NotifyHubAccessor(IHubContext<NotifyHub, INotifyHub> hubContext, IHttpUserContext httpUserContext) : base(hubContext, httpUserContext)
        {
        }
        public async Task NotifyUserAsync(string userId, string message, string notifyType)
        {
           await HubAccessor.Clients.User(userId).ReceiveNotify(message, notifyType);
        }

        public async Task NotifyAllAsync(string message, string notifyType)
        {
            await HubAccessor.Clients.All.ReceiveNotify(message, notifyType);
        }

        public async Task NotifySelfAsync(string message, string notifyType)
        {
            var selfId = HttpUserContext.GetCurrentUserId();
            await HubAccessor.Clients.User(selfId).ReceiveNotify(message, notifyType);
        }

        public async Task UpdateNotificationsGroup(string groupName)
        {
            await HubAccessor.Clients.Group(groupName).UpdateNotifications();
        }

        public async Task UpdateNotificationUser(Guid userId)
        {
            await HubAccessor.Clients.User(userId.ToString()).UpdateNotifications();
        }

        public async Task UpdateFriendsRequestCount(Guid userId)
        {
            await HubAccessor.Clients.User(userId.ToString()).UpdateRequestsCount();
        }
    }
}