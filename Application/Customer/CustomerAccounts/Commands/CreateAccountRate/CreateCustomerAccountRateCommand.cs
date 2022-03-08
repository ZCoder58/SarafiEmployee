using System;
using Application.Customer.CustomerAccounts.DTOs;
using Application.SubCustomers.DTOs;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.CreateAccountRate
{
    public class CreateCustomerAccountRateCommand:IRequest<CustomerAccountRateDTo>
    {
        public double Amount { get; set; }
        public Guid RatesCountryId { get; set; }
    }
}