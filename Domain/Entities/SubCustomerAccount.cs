using System;
using Domain.Common;
namespace Domain.Entities
{
    public class SubCustomerAccount:BaseEntity
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
        public RatesCountry RatesCountry { get; set; }
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}