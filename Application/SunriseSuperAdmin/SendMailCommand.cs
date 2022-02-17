using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Models.Emails;
using Application.Common.Statics;
using Domain.Interfaces;
using MediatR;

namespace Application.SunriseSuperAdmin
{
    public record SendMailCommand : IRequest;

    public class SendMailHandler:IRequestHandler<SendMailCommand>
    {
        private readonly IEmailSender _emailSender;

        public SendMailHandler(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        public async Task<Unit> Handle(SendMailCommand request, CancellationToken cancellationToken)
        {
            await _emailSender.SendEmailAsync("afgahmadi75@gmail.com", "test", "test message");
            await _emailSender.SendEmailAsync("afgahmadi75@gmail.com", "test",EmailTemplatesStatic.EmailActivationTemplate,new EmailActivationModel()
            {
                ActivationCode = "2lkjhlk12j3h4lk123jh4l1k23j4h1lk23j4h1lk23j4h1234",
                UserName = "afgAhmadi"
            });
            return Unit.Value;
        }
    }
}