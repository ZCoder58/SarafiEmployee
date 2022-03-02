using System.Threading;
using System.Threading.Tasks;
using Domain.Interfaces;
using MediatR;

namespace Application.SunriseSuperAdmin
{
    public record EmailSendCommand(string Email) : IRequest;

    public class EmailSendHandler:IRequestHandler<EmailSendCommand>
    {
        private readonly IEmailSender _email;

        public EmailSendHandler(IEmailSender email)
        {
            _email = email;
        }

        public async Task<Unit> Handle(EmailSendCommand request, CancellationToken cancellationToken)
        {
           await _email.SendEmailAsync(request.Email, "test ssl", "test ssl secured");
            return Unit.Value;
        }
    }
}