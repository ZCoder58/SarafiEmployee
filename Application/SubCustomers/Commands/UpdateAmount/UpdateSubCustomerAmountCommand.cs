using System;
using MediatR;

namespace Application.SubCustomers.Commands.UpdateAmount
{
    public record UpdateSubCustomerAmountCommand(Guid Id,double Amount,string Comment,int Type) : IRequest;
}