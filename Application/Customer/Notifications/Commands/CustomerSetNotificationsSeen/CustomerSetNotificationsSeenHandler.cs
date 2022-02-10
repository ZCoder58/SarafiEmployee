using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Notifications.Commands.CustomerSetNotificationsSeen
{
    public class CustomerSetNotificationsSeenHandler:IRequestHandler<CustomerSetNotificationsSeenCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        public CustomerSetNotificationsSeenHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(CustomerSetNotificationsSeenCommand request, CancellationToken cancellationToken)
        {
            var unSeenNotifications = _dbContext.CustomerNotifications
                .Where(a=>a.CustomerId==_httpUserContext.GetCurrentUserId().ToGuid()).GetUnSeenList();
            foreach (var unseen in unSeenNotifications)
            {
                unseen.IsSeen = true;
            }
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}