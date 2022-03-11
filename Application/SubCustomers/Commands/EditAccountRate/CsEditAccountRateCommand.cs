using System;
using Application.SubCustomers.DTOs;
using MediatR;
namespace Application.SubCustomers.Commands.EditAccountRate
{
    public class CsEditAccountRateCommand:IRequest<SubCustomerAccountRateDTo>
    {
        public Guid Id { get; set; }
        public Guid SubCustomerAccountId { get; set; }
        public Guid RatesCountryId { get; set; }
    }
}