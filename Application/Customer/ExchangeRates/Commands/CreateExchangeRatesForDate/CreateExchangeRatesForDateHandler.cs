using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.ExchangeRates.Commands.CreateExchangeRate;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.ExchangeRates.Commands.CreateExchangeRatesForDate
{
    public class CreateExchangeRatesForDateHandler : IRequestHandler<CreateExchangeRatesForDateCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMediator _mediator;

        public CreateExchangeRatesForDateHandler(IApplicationDbContext dbContext, IMapper mapper,
            IHttpUserContext httpUserContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(CreateExchangeRatesForDateCommand request,
            CancellationToken cancellationToken)
        {
            var targetRate = _dbContext.RatesCountries.GetById(request.RateCountryId);
            var rates = _dbContext.RatesCountries.ToList();
            foreach (var rate in rates)
            {
                if (rate.Id != request.RateCountryId)
                {
                    await _mediator.Send(new CreateExchangeRateCommand(rate.Abbr,targetRate.Abbr), cancellationToken);
                }
            }

            return Unit.Value;
        }
    }
}