using System.Data.SqlTypes;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit;
using Application.Customer.ExchangeRates.Extensions;
using Application.Customer.Friend.DTOs;
using Application.SubCustomers.Commands.CreateAccountRate;
using Application.SubCustomers.Commands.UpdateAccountAmount.Deposit;
using Application.SubCustomers.DTOs;
using Application.SubCustomers.Extensions;
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
        private readonly IMediator _mediator;

        public CsEditAccountRateHandler(IApplicationDbContext dbContext, IMapper mapper,
            IHttpUserContext httpUserContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
            _mediator = mediator;
        }

        public async Task<SubCustomerAccountRateDTo> Handle(CsEditAccountRateCommand request,
            CancellationToken cancellationToken)
        {
            var targetAccountRate = _dbContext.SubCustomerAccountRates
                .Include(a => a.RatesCountry).GetById(request.Id);

            if (targetAccountRate.RatesCountryId != request.ToRatesCountryId)
            {
                var exchangeAmount = _dbContext.CustomerExchangeRates.ConvertCurrencyById(
                    _httpUserContext.GetCurrentUserId().ToGuid(),
                    targetAccountRate.RatesCountryId,
                    request.ToRatesCountryId,
                    targetAccountRate.Amount,
                    request.ExchangeType);
                if (_dbContext.SubCustomerAccountRates.IsExists(
                    request.ToRatesCountryId,
                    targetAccountRate.SubCustomerAccountId, out var newAccountRate))
                {
                    newAccountRate.Amount += exchangeAmount;
                }
                else
                {
                    await _mediator.Send(new ScCreateAccountRateCommand()
                    {
                        Amount = exchangeAmount,
                        AddToAccount = false,
                        RatesCountryId = request.ToRatesCountryId,
                        SubCustomerAccountId = targetAccountRate.SubCustomerAccountId,
                        EnableTransaction = false
                    }, cancellationToken);
                }
                
                targetAccountRate.Amount = 0;
                await _dbContext.SaveChangesAsync(cancellationToken);
            }

            targetAccountRate.RatesCountry = _dbContext.RatesCountries.GetById(targetAccountRate.RatesCountryId);
            return _mapper.Map<SubCustomerAccountRateDTo>(targetAccountRate);
        }
    }
}