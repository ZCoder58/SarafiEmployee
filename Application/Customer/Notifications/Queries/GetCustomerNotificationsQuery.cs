using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Notifications.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Notifications.Queries
{
    public record GetCustomerNotificationsQuery() : IRequest<GetCustomerNotificationsDTo>;

    public class
        GetCustomerNotificationsHandler : IRequestHandler<GetCustomerNotificationsQuery, GetCustomerNotificationsDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;

        public GetCustomerNotificationsHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext,
            IMapper mapper)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
        }

        public async Task<GetCustomerNotificationsDTo> Handle(GetCustomerNotificationsQuery request,
            CancellationToken cancellationToken)
        {
            var customerId = _httpUserContext.GetCurrentUserId().ToGuid();
            var notifications = _dbContext.CustomerNotifications
                .Where(a=>a.CustomerId==customerId)
                .OrderDescending();
            var unSeenCount =await notifications
                .GetUnSeenList().CountAsync(cancellationToken);
            return new GetCustomerNotificationsDTo()
            {
                Notifications = await notifications.Take(6).ProjectTo<CustomerNotificationDTo>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken),
                UnseenCount = unSeenCount
            };

        }
    }
}