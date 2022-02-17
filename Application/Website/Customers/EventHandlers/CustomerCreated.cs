using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Models.Emails;
using Application.Common.Statics;
using Domain.Interfaces;
using MediatR;

namespace Application.Website.Customers.EventHandlers
{
    public record CustomerCreated(Domain.Entities.Customer Customer) : INotification;

    public class CustomerCreatedHandler:INotificationHandler<CustomerCreated>
    {
        private readonly IEmailSender _emailService;

        public CustomerCreatedHandler(IEmailSender emailService)
        {
            _emailService = emailService;
        }

        public async Task Handle(CustomerCreated notification, CancellationToken cancellationToken)
        {
            await _emailService.SendEmailAsync(
                notification.Customer.Email,
                "فعال سازی حساب کاربری",
                EmailTemplatesStatic.EmailActivationTemplate
                ,new EmailActivationModel()
                {
                    ActivationCode = notification.Customer.ActivationAccountCode,
                    UserName = notification.Customer.UserName
                });
        }
    }
}