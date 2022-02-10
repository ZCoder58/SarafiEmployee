using System;
using MediatR;

namespace Application.SunriseSuperAdmin.Rates.Commands.DeleteRate
{
    public record DeleteRateCommand(Guid Id) : IRequest;

}