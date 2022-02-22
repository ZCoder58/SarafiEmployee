using System;
using Application.SubCustomers.DTOs;
using MediatR;
namespace Application.SubCustomers.Commands.EditAccountRate
{
    public class EditAccountRateCommand:IRequest<SubCustomerAccountRateDTo>
    {
        public Guid Id { get; set; }
        public double Amount { get; set; }
        public Guid SubCustomerAccountId { get; set; }
        public Guid RatesCountryId { get; set; }
    }
}