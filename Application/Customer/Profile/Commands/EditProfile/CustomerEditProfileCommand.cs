using MediatR;

namespace Application.Customer.Profile.Commands.EditProfile
{
    public record CustomerEditProfileCommand(
        string UserName,
        int Phone,
        string Email
    ) : IRequest<string>;
}
