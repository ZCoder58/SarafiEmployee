using System;
using MediatR;

namespace Application.Customer.Profile.Commands.EditProfile
{
    public record CustomerEditProfileCommand(
        string UserName,
        int Phone,
        string Email,
        string Name,
        string LastName,
        string City,
        string DetailedAddress,
        string FatherName,
        Guid CountryId
    ) : IRequest<string>;
}
