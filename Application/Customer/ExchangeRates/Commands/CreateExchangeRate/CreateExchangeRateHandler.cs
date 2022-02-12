using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
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
            var newExchangeRate = new CustomerExchangeRate();
            if (!_dbContext.CustomerExchangeRates.Any(b =>
                b.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                b.ToRatesCountry.Abbr == request.AbbrTo &&
                b.FromRatesCountry.Abbr == request.AbbrFrom &&
                (b.CreatedDate.Value.Date == DateTime.UtcNow.Date ||
                 b.UpdatedDate.Value.Date == DateTime.UtcNow.Date)))
            {
                var fromRate = _dbContext.RatesCountries.GetByAbbr(request.AbbrFrom);
                var toRate = _dbContext.RatesCountries.GetByAbbr(request.AbbrTo);
                newExchangeRate = (await _dbContext.CustomerExchangeRates.AddAsync(new CustomerExchangeRate()
                {
                    CustomerId = _httpUserContext.GetCurrentUserId().ToGuid(),
                    ToRatesCountryId = toRate.Id,
                    FromRatesCountryId = fromRate.Id,
                    Updated = request.AbbrFrom == request.AbbrTo
                }, cancellationToken)).Entity;
                await _dbContext.SaveChangesAsync(cancellationToken);
            }

            return newExchangeRate;
        }
    }
}