using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Countries.DTOs;
using Application.Countries.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers
{
    [Authorize]
    [Route("api/general/[action]")]
    public class GeneralController : ApiBaseController
    {
        // GET
        public Task<IEnumerable<CountryListDTo>> GetCountries()
        {
            return Mediator.Send(new GetCountriesListQuery());
        }
    }
}