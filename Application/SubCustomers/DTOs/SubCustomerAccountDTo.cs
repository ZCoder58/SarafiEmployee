using System;
using Domain.Entities;

namespace Application.SubCustomers.DTOs
{
    public class SubCustomerAccountDTo
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public string Phone { get; set; }
    }
}