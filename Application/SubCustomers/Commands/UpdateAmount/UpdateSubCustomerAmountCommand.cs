using System;
using MediatR;

namespace Application.SubCustomers.Commands.UpdateAmount
{
    public record UpdateSubCustomerAmountCommand(
        Guid SubCustomerId,
        Guid SubCustomerAccountRateId,
        double Amount,
        string Comment,
        int Type,
        Guid? TransferId=null) : IRequest;
}