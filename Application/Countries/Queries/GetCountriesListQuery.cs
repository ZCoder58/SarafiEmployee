using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Countries.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Countries.Queries
{
    public record GetCountriesListQuery : IRequest<IEnumerable<CountryListDTo>>;

    public class GetCountriesListHandler:IRequestHandler<GetCountriesListQuery,IEnumerable<CountryListDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        public GetCountriesListHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CountryListDTo>> Handle(GetCountriesListQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.Countries.OrderBy(a => a.Name).ProjectTo<CountryListDTo>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);
            
        }
    }
}