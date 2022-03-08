using System;

namespace Application.Company.Employees.DTOs
{
    public class EmployeeTableDTo
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string FatherName { get; set; }
        public string Photo { get; set; }
        public string Phone { get; set; }
        public string UserName { get; set; }
        public bool IsActive { get; set; }
        public string CountryName { get; set; }
        public string CompanyAgencyName { get; set; }
    }
}