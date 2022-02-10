using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.SunriseSuperAdmin.Customers.EventHandlers
{
    public record UserAddedEvent(Domain.Entities.Customer Customer) : INotification;
    public class EmailHandler:INotificationHandler<UserAddedEvent>
    {
        private readonly IEmailSender _emailSender;

        public EmailHandler(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        public Task Handle(UserAddedEvent notification, CancellationToken cancellationToken)
        {
            //send activation code
            StringBuilder template = new ();
            template.AppendLine("<div dir='rtl'>");
            template.AppendLine("<h2>سلام به شما کاربر گرامی </h2>");
            template.AppendLine("<h3>تشکر از شما برای ثبت نام در سایت صرافی انلاین برای فعال سازی حساب خود بر روی لینک زیر کلیک کنید</h3>");
            template.AppendLine("<a href='https://localhost:5001/activateAccount?id="+notification.Customer.Id+"> فعال سازی حساب کاربری</a>");
            template.AppendLine("</div>");
            _emailSender.SendEmailAsync(notification.Customer.Email, "فعال سازی حساب کاربری", template.ToString());
            return Task.CompletedTask;
        }
    }
}