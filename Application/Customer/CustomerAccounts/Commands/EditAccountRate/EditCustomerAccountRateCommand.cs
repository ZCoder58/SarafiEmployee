using System;
using Application.Customer.CustomerAccounts.DTOs;
using Application.SubCustomers.DTOs;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.EditAccountRate
{
    public class EditCustomerAccountRateCommand:IRequest<CustomerAccountRateDTo>
    {
        public Guid Id { get; set; }
        public double Amount { get; set; }
        public Guid RatesCountryPriceName { get; set; }
        public Guid RatesCountryId { get; set; }
    }
}