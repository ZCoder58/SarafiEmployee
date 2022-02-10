using System.Linq;
using System.Security.Claims;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;

namespace Application.Common.Services
{
    public class SignalrUserProvider : IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection)
        {
            var userId = connection.User.FindFirstValue("userId");
            return userId;
        }
    }
}