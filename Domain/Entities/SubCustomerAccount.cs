using System;
using System.Collections.Generic;
using Domain.Common;
namespace Domain.Entities
{
    public class SubCustomerAccount:BaseEntity
    {
        public SubCustomerAccount()
        {
            SubCustomerAccountRates = new List<SubCustomerAccountRate>();
        }
        public string Name { get; set; }
        public string CodeNumber { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public int SId { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Photo { get; set; }
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }
        public IEnumerable<SubCustomerAccountRate> SubCustomerAccountRates { get; set; }
    }
}