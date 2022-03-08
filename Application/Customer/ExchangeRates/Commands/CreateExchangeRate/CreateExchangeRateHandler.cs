using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.SunriseSuperAdmin.Rates.Extensions;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.ExchangeRates.Commands.CreateExchangeRate
{
    public class CreateExchangeRateHandler : IRequestHandler<CreateExchangeRateCommand, CustomerExchangeRate>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;

        public CreateExchangeRateHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public async Task<CustomerExchangeRate> Handle(CreateExchangeRateCommand request,
            CancellationToken cancellationToken)
        {
            var fromCurrency = _dbContext.RatesCountries.GetById(request.FromCurrency);
            var toCurrency = _dbContext.RatesCountries.GetById(request.ToCurrency);


            //add base
            var newCustomerExchangeRate = (await _dbContext.CustomerExchangeRates.AddAsync(new CustomerExchangeRate()
            {
                CustomerId = _httpUserContext.GetCurrentUserId().ToGuid(),
                FromRatesCountryId = fromCurrency.Id,
                ToRatesCountryId = toCurrency.Id,
                Updated = request.Updated,
                Reverse = false,
                FromAmount = request.FromAmount,
                ToExchangeRateSell = request.ToAmountSell,
                ToExchangeRateBuy = request.ToAmountBuy
            }, cancellationToken)).Entity;
            // if (request.FromCurrency != request.ToCurrency)
            // {
            //     //add reverse
            //     await _dbContext.CustomerExchangeRates.AddAsync(new CustomerExchangeRate()
            //     {
            //         CustomerId = _httpUserContext.GetCurrentUserId().ToGuid(),
            //         FromRatesCountryId = toCurrency.Id,
            //         ToRatesCountryId = fromCurrency.Id,
            //         Updated = request.Updated,
            //         Reverse = true,
            //         FromAmount = request.ToAmount,
            //         ToExchangeRate = request.FromAmount
            //     }, cancellationToken);
            // }
            // else
            // {
            //     newCustomerExchangeRate.Updated = true;
            // }

            await _dbContext.SaveChangesAsync(cancellationToken);


            return newCustomerExchangeRate;
        }
    }
}