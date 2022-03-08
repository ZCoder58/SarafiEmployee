using MediatR;

namespace Application.Company.Agencies.Commands.CreateAgency
{
    public record CreateAgencyCommand(string Name) : IRequest;
}