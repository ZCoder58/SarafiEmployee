using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.ExchangeRates.DTos;
using AutoMapper;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.ExchangeRates.Queries
{
    public record GetCustomerExchangeRateEditQuery(Guid ExchangeRateId) : IRequest<CustomerExchangeRateEditDTo>;

    public class GetCustomerExchangeRateEditHandler:IRequestHandler<GetCustomerExchangeRateEditQuery,CustomerExchangeRateEditDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;

        public GetCustomerExchangeRateEditHandler(IApplicationDbContext dbContext, IMapper mapper, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
        }

        public async Task<CustomerExchangeRateEditDTo> Handle(GetCustomerExchangeRateEditQuery request, CancellationToken cancellationToken)
        {
            var targetCustomerExchangeRate = _dbContext.CustomerExchangeRates
                .Include(a=>a.FromRatesCountry)
                .Include(a=>a.ToRatesCountry)
                .GetById(request.ExchangeRateId);
            if (targetCustomerExchangeRate.CustomerId != _httpUserContext.GetCurrentUserId().ToGuid() && 
                targetCustomerExchangeRate.CreatedDate?.Date!=DateTime.UtcNow.Date)
            {
                throw new EntityNotFoundException();
            }

            return await Task.FromResult(_mapper.Map<CustomerExchangeRateEditDTo>(targetCustomerExchangeRate));
        }
    }
}