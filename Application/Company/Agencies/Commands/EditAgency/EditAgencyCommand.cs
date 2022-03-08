using System;
using MediatR;

namespace Application.Company.Agencies.Commands.EditAgency
{
    public record EditAgencyCommand(Guid Id,string Name) : IRequest;
}