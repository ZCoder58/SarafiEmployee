using System;
using System.Threading.Tasks;

namespace Domain.Interfaces.IHubs.IAccessors
{
    public interface INotifyHubAccessor
    {
        /// <summary>
        /// send Toast Notification to specific customer
        /// </summary>
        /// <param name="userId">customer id</param>
        /// <param name="message">message</param>
        /// <param name="notifyType">warning,info,error,primary</param>
        /// <returns></returns>
        Task NotifyUserAsync(string userId,string message,string notifyType);
        /// <summary>
        /// send Toast Notification to all users
        /// </summary>
        /// <param name="message">message</param>
        /// <param name="notifyType">warning,info,error,primary</param>
        /// <returns></returns>
        Task NotifyAllAsync(string message,string notifyType);
        
        /// <summary>
        /// send Toast Notification to caller
        /// </summary>
        /// <param name="message">message</param>
        /// <param name="notifyType">warning,info,error,primary</param>
        /// <returns></returns>
        Task NotifySelfAsync(string message,string notifyType);
        /// <summary>
        /// force a group to call notification update from server
        /// </summary>
        /// <param name="groupName"></param>
        /// <returns></returns>
        Task UpdateNotificationsGroup(string groupName);
        /// <summary>
        /// force a user to call notification update from server
        /// </summary>
        /// <returns></returns>
        Task UpdateNotificationUser(Guid userId);
        Task UpdateFriendsRequestCount(Guid userId);
    }
}