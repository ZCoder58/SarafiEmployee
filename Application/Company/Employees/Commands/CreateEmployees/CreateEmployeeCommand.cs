using System;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Company.Employees.Commands.CreateEmployees
{
    public class CreateEmployeeCommand:IRequest
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string City { get; set; }
        public string DetailedAddress { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public Guid CountryId { get; set; }
        public IFormFile Photo { get; set; }
    }
}