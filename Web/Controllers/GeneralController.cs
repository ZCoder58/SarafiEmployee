using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Countries.DTOs;
using Application.Countries.Queries;
using Application.Customer.Friend.DTOs;
using Application.Customer.Friend.Queries.GetFriendProfile;
using Application.SunriseSuperAdmin;
using Application.SunriseSuperAdmin.Rates.DTos;
using Application.SunriseSuperAdmin.Rates.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers
{
   
    [Route("api/general/[action]")]
    public class GeneralController : ApiBaseController
    {
        public Task<IEnumerable<CountryListDTo>> GetCountries()
        {
            return Mediator.Send(new GetCountriesListQuery());
        }
        [Authorize("customerSimple")]
        public Task<FriendProfileDTo> Profile(Guid customerId)
        {
            return Mediator.Send(new GetFriendProfileQuery(customerId));
        }
        [Authorize]
        public Task<IEnumerable<RateDTo>> Rates()
        {
            return Mediator.Send(new GetRatesListQuery());
        }
    }
}