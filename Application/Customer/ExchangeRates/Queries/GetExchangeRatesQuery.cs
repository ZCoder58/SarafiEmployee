using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.ExchangeRates.Commands.CreateExchangeRate;
using Application.Customer.ExchangeRates.DTos;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using MediatR.Pipeline;

namespace Application.Customer.ExchangeRates.Queries
{
    public record GetExchangeRatesQuery(string AbbrFrom,string AbbrTo) : IRequest<ExchangeRatesDTo>;

    public class GetExchangeRatesHandler:IRequestHandler<GetExchangeRatesQuery,ExchangeRatesDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public GetExchangeRatesHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper, IMediator mediator)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
            _mediator = mediator;
        }

        public async Task<ExchangeRatesDTo> Handle(GetExchangeRatesQuery request, CancellationToken cancellationToken)
        {
            var userId = _httpUserContext.GetCurrentUserId().ToGuid();
            var targetExchangeRate = _dbContext.CustomerExchangeRates.FirstOrDefault(a =>
                a.CreatedDate.Value.Date == DateTime.Now.Date &&
                a.CustomerId==userId&&
                a.FromRatesCountry.Abbr == request.AbbrFrom &&
                a.ToRatesCountry.Abbr == request.AbbrTo);
            if (targetExchangeRate.IsNull())
            {
               var newExchangeRate=await _mediator.Send(new CreateExchangeRateCommand(request.AbbrFrom, request.AbbrTo),cancellationToken);
               return _mapper.Map<ExchangeRatesDTo>(newExchangeRate);
            }
            return _mapper.Map<ExchangeRatesDTo>(targetExchangeRate);
        }
    }
}