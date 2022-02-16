using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Countries.DTOs;
using Application.Countries.Queries;
using Application.Customer.Friend.DTOs;
using Application.Customer.Friend.Queries.GetFriendProfile;
using Application.SunriseSuperAdmin.Rates.DTos;
using Application.SunriseSuperAdmin.Rates.Queries;
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
        
        public Task<FriendProfileDTo> Profile(Guid customerId)
        {
            return Mediator.Send(new GetFriendProfileQuery(customerId));
        }
        [HttpGet]
        public Task<IEnumerable<RateDTo>> Rates()
        {
            return Mediator.Send(new GetRatesListQuery());
        }
    }
}