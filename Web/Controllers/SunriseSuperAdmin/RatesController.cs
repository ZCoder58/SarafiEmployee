using System;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.SunriseSuperAdmin.Rates.Commands.CreateRate;
using Application.SunriseSuperAdmin.Rates.Commands.DeleteRate;
using Application.SunriseSuperAdmin.Rates.Commands.UpdateRate;
using Application.SunriseSuperAdmin.Rates.DTos;
using Application.SunriseSuperAdmin.Rates.EventHandlers;
using Application.SunriseSuperAdmin.Rates.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.SunriseSuperAdmin
{
    [Authorize("management")]
    [Route("api/management/rates")]
    public class RatesController : ApiBaseController
    {
        [HttpGet]
        public Task<PaginatedList<RateDTo>> Rates(int page,int perPage,string column,string direction)
        {
            return Mediator.Send(new GetRatesCountriesTableQuery(new TableFilterModel()
            {
                Page = page,
                PerPage = perPage,
                Column=column,
                Direction = direction
            }));
        }

        [HttpGet("{id}")]
        public Task<RateDTo> GetRate(Guid id)
        {
            return Mediator.Send(new GetRateCountryQuery(id));
        }
        [HttpPost]
        public Task CreateRate([FromForm]CreateRateCommand request)
        {
            return Mediator.Send(request);
        }
        [HttpPut]
        public Task UpdateRate([FromForm]UpdateRateCommand request)
        {
            return Mediator.Send(request);
        }
        [HttpDelete("{id}")]
        public Task DeleteRate(Guid id)
        {
            return Mediator.Send(new DeleteRateCommand(id));
        }
    }
}