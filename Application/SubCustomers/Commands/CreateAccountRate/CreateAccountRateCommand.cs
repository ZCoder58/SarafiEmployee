using System;
using MediatR;

namespace Application.SubCustomers.Commands.CreateAccountRate
{
    public class CreateAccountRateCommand:IRequest
    {
        public Guid SubCustomerAccountId { get; set; }
        public double Amount { get; set; }
        public Guid RatesCountryId { get; set; }
    }
}