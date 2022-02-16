using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Customer.ExchangeRates.Commands.CreateExchangeRate;
using Application.Customer.ExchangeRates.Commands.UpdateExchangeRate;
using Application.Customer.ExchangeRates.DTos;
using Application.Customer.ExchangeRates.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.Customer
{
    [Authorize("customer")]
    [Route("api/customer/rates")]
    public class RatesController : ApiBaseController
    {
       
        [HttpGet("todayExchangeRates")]
        public Task<IEnumerable<CustomerExchangeRatesListDTo>> GetExchangeRatesForToday()
        {
            return Mediator.Send(new GetTodayExchangeRatesTableQuery(DateTime.UtcNow));
        }
        [HttpPost("exchangeRates")]
        public Task CreateExchangeRate([FromForm]CreateExchangeRateCommand request)
        {
            return Mediator.Send(request);
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
        public Task<ExchangeRatesDTo> GetExchangeRateRate(Guid from, Guid to)
        {
            return Mediator.Send(new GetExchangeRateQuery(from, to));
        }
    }
}