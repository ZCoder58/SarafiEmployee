using System;
using MediatR;

namespace Application.SunriseSuperAdmin.Customers.Commands.SetCustomerAccountPremium
{
    public record SetCustomerAccountPremiumCommand(Guid Id) : IRequest<bool>;
}