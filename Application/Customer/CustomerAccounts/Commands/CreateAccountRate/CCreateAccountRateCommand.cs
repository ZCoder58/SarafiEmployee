using System;
using Application.Customer.CustomerAccounts.DTOs;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.CreateAccountRate
{
    public class CCreateAccountRateCommand:IRequest<CustomerAccountRateDTo>
    {
        public double Amount { get; set; }
        public Guid RatesCountryId { get; set; }
    }
}