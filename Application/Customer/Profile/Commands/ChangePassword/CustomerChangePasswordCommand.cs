using MediatR;

namespace Application.Customer.Profile.Commands.ChangePassword
{
    public record CustomerChangePasswordCommand(string CurrentPassword,string NewPassword):IRequest;
}