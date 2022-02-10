using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Customer.ExchangeRates.Commands.UpdateExchangeRate;
using Application.Customer.ExchangeRates.DTos;
using Application.Customer.ExchangeRates.Queries;
using Application.SunriseSuperAdmin.Rates.DTos;
using Application.SunriseSuperAdmin.Rates.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.Customer
{
    [Authorize("customer")]
    [Route("api/customer/rates")]
    public class RatesController : ApiBaseController
    {
        [HttpGet]
        public Task<IEnumerable<RateDTo>> GetRatesList()
        {
            return Mediator.Send(new GetRatesListQuery());
        }
        [HttpGet("{id}")]
        public Task<RateDTo> GetRate(Guid id)
        {
            return Mediator.Send(new GetRateCountryQuery(id));
        }
        [HttpGet("exchangeRates")]
        public Task<IEnumerable<CustomerExchangeRatesListDTo>> GetExchangeRatesForDate(Guid rate)
        {
            return Mediator.Send(new GetCustomerExchangeRatesListQuery(rate,DateTime.Now));
        }
        [HttpGet("exchangeRates/{id}")]
        public Task<CustomerExchangeRateEditDTo> GetUpdateRateEdit(Guid id)
        {
            return Mediator.Send(new GetCustomerExchangeRateEditQuery(id));
        }
        [HttpPut("exchangeRates")]
        public Task UpdateExchangeRate([FromForm]UpdateExchangeRateCommand request)
        {
            return Mediator.Send(request);
        }
        [HttpGet("exchangeRate")]
        public Task<ExchangeRatesDTo> GetExchangeRateRate(string from, string to)
        {
            return Mediator.Send(new GetExchangeRatesQuery(from, to));
        }
    }
}