using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.ExchangeRates.Commands.CreateExchangeRate;
using Application.Customer.ExchangeRates.DTos;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using MediatR.Pipeline;

namespace Application.Customer.ExchangeRates.Queries
{
    public record GetExchangeRateQuery(Guid FromCurrencyId,Guid ToCurrencyId) : IRequest<ExchangeRatesDTo>;

    public class GetExchangeRateHandler:IRequestHandler<GetExchangeRateQuery,ExchangeRatesDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public GetExchangeRateHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper, IMediator mediator)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
            _mediator = mediator;
        }

        public async Task<ExchangeRatesDTo> Handle(GetExchangeRateQuery request, CancellationToken cancellationToken)
        {
            var userId = _httpUserContext.GetCurrentUserId().ToGuid();
            var targetExchangeRate = _dbContext.CustomerExchangeRates.Where(a=>
                                         a.CreatedDate.Value.Date == CDateTime.Now.Date.Date )
                .FirstOrDefault(a =>
                a.CustomerId==userId&&
                (a.FromRatesCountry.Id == request.FromCurrencyId &&
                 a.ToRatesCountry.Id == request.ToCurrencyId) ||
                (a.FromRatesCountry.Id == request.ToCurrencyId &&
                 a.ToRatesCountry.Id == request.FromCurrencyId));
            if (targetExchangeRate.IsNull())
            {
                var updated = request.FromCurrencyId == request.ToCurrencyId;
               var newExchangeRate=await _mediator.Send(new CreateExchangeRateCommand(request.FromCurrencyId, request.ToCurrencyId,1,1,1,updated),cancellationToken);
               return _mapper.Map<ExchangeRatesDTo>(newExchangeRate);
            }
            
            var newExchangeRatesDTo = _mapper.Map<ExchangeRatesDTo>(targetExchangeRate);

            newExchangeRatesDTo.Reverse = targetExchangeRate.FromRatesCountryId != request.FromCurrencyId;

            return newExchangeRatesDTo;
        }
    }
}