using System;
using MediatR;

namespace Application.Customer.Balances.Commands.CreateBalance
{
    public class CCreateBalanceCommand:IRequest
    {
        public double Amount { get; set; }
        public int Type { get; set; }
        public Guid RatesCountryId { get; set; }
        public string Comment { get; set; }
        public Guid FId { get; set; }
        public bool AddToAccount { get; set; }
    }
    
    
}