using System;
using Newtonsoft.Json;

namespace Application.SunriseSuperAdmin.Customers.DTOs
{
    public class MCustomerTableDTo
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string UserType { get; set; }
        public bool IsPremiumAccount { get; set; }
        public bool IsActive { get; set; }
    }
}