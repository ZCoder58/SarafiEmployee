using System;
using Domain.Entities;

namespace Application.SubCustomers.DTOs
{
    public class SubCustomerTableDTo
    {
        public string Name { get; set; }
        public string FatherName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public double Amount { get; set; }
        public string RatesCountryPriceName { get; set; }
    }
}