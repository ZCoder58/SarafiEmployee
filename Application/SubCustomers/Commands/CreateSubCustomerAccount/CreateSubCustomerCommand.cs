using System;
using MediatR;

namespace Application.SubCustomers.Commands.CreateSubCustomerAccount
{
    public class CreateSubCustomerCommand:IRequest
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public int SId { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public double Amount { get; set; }
        public string Photo { get; set; }
        public Guid RatesCountryId { get; set; }
    }
}