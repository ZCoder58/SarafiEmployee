using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.SunriseSuperAdmin.Rates.DTos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SunriseSuperAdmin.Rates.Queries
{
    public record GetRatesListQuery : IRequest<IEnumerable<RateDTo>>;

    public class GetRatesListHandler:IRequestHandler<GetRatesListQuery,IEnumerable<RateDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        public GetRatesListHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RateDTo>> Handle(GetRatesListQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.RatesCountries
                .ProjectTo<RateDTo>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}