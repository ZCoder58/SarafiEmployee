using System.Data.SqlTypes;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.ExchangeRates.Extensions;
using Application.Customer.Friend.DTOs;
using Application.SubCustomers.DTOs;
using AutoMapper;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.EditAccountRate
{
    public class CsEditAccountRateHandler : IRequestHandler<CsEditAccountRateCommand, SubCustomerAccountRateDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;

        public CsEditAccountRateHandler(IApplicationDbContext dbContext, IMapper mapper,
            IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
        }

        public async Task<SubCustomerAccountRateDTo> Handle(CsEditAccountRateCommand request,
            CancellationToken cancellationToken)
        {
            var targetAccountRate = _dbContext.SubCustomerAccountRates
                .Include(a => a.RatesCountry).GetById(request.Id);
            if (targetAccountRate.RatesCountryId != request.ToRatesCountryId)
            {
                targetAccountRate.Amount = _dbContext.CustomerExchangeRates.ConvertCurrencyById(
                    _httpUserContext.GetCurrentUserId().ToGuid(),
                    targetAccountRate.RatesCountryId,
                    request.ToRatesCountryId,
                    targetAccountRate.Amount,
                    request.ExchangeType);
                targetAccountRate.RatesCountryId = request.ToRatesCountryId;
                await _dbContext.SaveChangesAsync(cancellationToken);
            }

            targetAccountRate.RatesCountry = _dbContext.RatesCountries.GetById(
                targetAccountRate.RatesCountryId == request.ToRatesCountryId
                    ? targetAccountRate.RatesCountryId
                    : request.ToRatesCountryId);
            return _mapper.Map<SubCustomerAccountRateDTo>(targetAccountRate);
        }
    }
}