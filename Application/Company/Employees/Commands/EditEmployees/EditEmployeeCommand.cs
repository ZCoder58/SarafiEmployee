using System;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Company.Employees.Commands.EditEmployees
{
    public class EditEmployeeCommand:IRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string DetailedAddress { get; set; }
        public Guid CountryId { get; set; }
        public bool IsActive { get; set; }
        public IFormFile PhotoFile { get; set; }
        public Guid CompanyAgencyId { get; set; }
    }
}