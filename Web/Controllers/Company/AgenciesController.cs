using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.Company.Agencies.Commands.CreateAgency;
using Application.Company.Agencies.Commands.EditAgency;
using Application.Company.Agencies.DTOs;
using Application.Company.Agencies.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.Company
{
    [Authorize("company")]
    [Route("api/company/agencies")]
    public class AgenciesController:ApiBaseController
    {
        [HttpGet]
        public Task<PaginatedList<AgenciesTableDto>> GetAgenciesTable(int page,int perPage,string column,string direction,string searchText)
        {
            return Mediator.Send(new GetAgenciesTableQuery(new TableFilterModel()
            {   
                Page = page,
                PerPage = perPage,
                Column = column,
                Direction = direction,
                Search = searchText
            }));
        }
        [HttpPost]
        public Task CreateAgency([FromForm] CreateAgencyCommand request)
        {
            return Mediator.Send(request);
        }
        [HttpGet("edit")]
        public Task<AgencyEditDTo> EditAgency(Guid id)
        {
            return Mediator.Send(new GetAgencyEditQuery(id));
        }
        [HttpPut]
        public Task EditAgency([FromForm] EditAgencyCommand request)
        {
            return Mediator.Send(request);
        }
        [HttpGet("select")]
        public Task<IEnumerable<AgenciesSelectDTo>> GetAgenciesSelect()
        {
            return Mediator.Send(new GetAgenciesSelectQuery());
        }
        
    }
}