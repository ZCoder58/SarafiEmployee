using MediatR;

namespace Application.Customer.Notifications.Commands.CustomerSetNotificationsSeen
{
    public record CustomerSetNotificationsSeenCommand : IRequest;
}