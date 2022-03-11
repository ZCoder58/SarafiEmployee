using System;
using Application.SubCustomers.DTOs;
using MediatR;

namespace Application.SubCustomers.Commands.CreateAccountRate
{
    public class ScCreateAccountRateCommand:IRequest<SubCustomerAccountRateDTo>
    {
        public Guid SubCustomerAccountId { get; set; }
        public double Amount { get; set; }
        public Guid RatesCountryId { get; set; }
        
        public bool AddToAccount { get; set; }
    }
}