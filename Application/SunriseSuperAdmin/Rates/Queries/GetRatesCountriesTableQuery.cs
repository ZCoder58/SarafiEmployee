using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Models;
using Application.SunriseSuperAdmin.Rates.DTos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;

namespace Application.SunriseSuperAdmin.Rates.Queries
{
    public record GetRatesCountriesTableQuery(TableFilterModel Model) : IRequest<PaginatedList<RateDTo>>;
    public class GetRatesCountriesTableHandler:IRequestHandler<GetRatesCountriesTableQuery,PaginatedList<RateDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public GetRatesCountriesTableHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public Task<PaginatedList<RateDTo>> Handle(GetRatesCountriesTableQuery request, CancellationToken cancellationToken)
        {
            return _dbContext.RatesCountries.OrderDescending()
                .ProjectTo<RateDTo>(_mapper.ConfigurationProvider).ToPaginatedListAsync(request.Model);
        }
    }
}