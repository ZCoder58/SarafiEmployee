using Domain.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace Application.Common.Services.HubsAccessors.Base
{
    public abstract class BaseHubAccessor<T,T2> where T:Hub<T2> where T2:class
    {
        protected readonly IHttpUserContext HttpUserContext;
        protected readonly IHubContext<T,T2> HubAccessor;
        
        protected BaseHubAccessor(IHubContext<T,T2> hubContext,IHttpUserContext httpUserContext)
        {
            HubAccessor = hubContext;
            HttpUserContext = httpUserContext;
        }
    }
}