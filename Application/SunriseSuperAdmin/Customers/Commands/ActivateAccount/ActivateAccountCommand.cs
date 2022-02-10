using MediatR;

namespace Application.SunriseSuperAdmin.Customers.Commands.ActivateAccount
{
    public record ActivateAccountCommand(string Id) : IRequest<Unit>;
}