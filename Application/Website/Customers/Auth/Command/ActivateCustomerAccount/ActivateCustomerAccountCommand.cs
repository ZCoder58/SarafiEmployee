using Application.Website.Customers.DTOs;
using MediatR;

namespace Application.Website.Customers.Auth.Command.ActivateCustomerAccount
{
    public record ActivateCustomerAccountCommand(string Id) : IRequest<AccountActivationDTo>;
}