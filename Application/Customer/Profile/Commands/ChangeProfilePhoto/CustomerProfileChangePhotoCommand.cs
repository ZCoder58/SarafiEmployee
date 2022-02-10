using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Customer.Profile.Commands.ChangeProfilePhoto
{
    public record CustomerProfileChangePhotoCommand(IFormFile PhotoFile) : IRequest<string>;
}