using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string to, string subject, string message);

    }
}