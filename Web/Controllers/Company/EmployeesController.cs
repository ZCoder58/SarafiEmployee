using System;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.Company.Employees.Commands.CreateEmployees;
using Application.Company.Employees.Commands.EditEmployees;
using Application.Company.Employees.DTOs;
using Application.Company.Employees.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.Company
{
    [Authorize("company")]
    [Route("api/company/[controller]")]
    public class EmployeesController : ApiBaseController
    {
        
        public Task<PaginatedList<EmployeeTableDTo>> EmployeesTable(int page,int perPage,string column,string direction,string search)
        {
            return Mediator.Send(new GetEmployeesTableQuery(new TableFilterModel()
            {
                Page = page,
                PerPage = perPage,
                Direction = direction,
                Search = search,
                Column = column
            }));
        }
        [Authorize("limitEmployees")]
        [HttpPost]
        public Task CreateEmployee([FromForm] CreateEmployeeCommand request)
        {
            return Mediator.Send(request);
        }
        [HttpGet("edit")]
        public Task<EditEmployeeDTo> EditEmployee(Guid id)
        {
            return Mediator.Send(new GetEditEmployeeQuery(id));
        }
        [HttpPut("edit")]
        public Task EditEmployee([FromForm] EditEmployeeCommand request)
        {
            return Mediator.Send(request);
        }
    }
}