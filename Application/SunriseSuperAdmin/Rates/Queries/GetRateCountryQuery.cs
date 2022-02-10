using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Models;
using Application.SunriseSuperAdmin.Rates.DTos;
using AutoMapper;
using Domain.Interfaces;
using MediatR;

namespace Application.SunriseSuperAdmin.Rates.Queries
{
    public record GetRateCountryQuery(Guid Id) : IRequest<RateDTo>;
    public class GetRateCountryHandler:IRequestHandler<GetRateCountryQuery,RateDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        public GetRateCountryHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<RateDTo> Handle(GetRateCountryQuery request, CancellationToken cancellationToken)
        {
            var targetRate = _dbContext.RatesCountries.GetById(request.Id);
            if (targetRate.IsNull())
            {
                throw new EntityNotFoundException();
            }
            return await Task.FromResult(_mapper.Map<RateDTo>(targetRate));
        }
    }
}