using System;
using System.Collections;
using System.Collections.Generic;
using Domain.Common;

namespace Domain.Entities
{
    public class CompanyAgency:BaseEntity
    {
        public CompanyAgency()
        {
            Customers = new List<Customer>();
        }
        public string Name { get; set; }
        public Guid CompanyInfoId { get; set; }
        public CompanyInfo CompanyInfo { get; set; }
        public IEnumerable<Customer> Customers { get; set; }
    }
}