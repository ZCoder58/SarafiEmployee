using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Models;
using Application.Company.Agencies.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;

namespace Application.Company.Agencies.Queries
{
    public record GetAgenciesTableQuery(TableFilterModel FilterModel) : IRequest<PaginatedList<AgenciesTableDto>>;

    public class GetAgenciesTableHandler:IRequestHandler<GetAgenciesTableQuery,PaginatedList<AgenciesTableDto>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        public GetAgenciesTableHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
        }

        public async Task<PaginatedList<AgenciesTableDto>> Handle(GetAgenciesTableQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.CompanyAgencies
                .OrderDescending()
                .Where(a => a.CompanyInfoId == _httpUserContext.GetCompanyId().ToGuid())
                .ProjectTo<AgenciesTableDto>(_mapper.ConfigurationProvider)
                .ToPaginatedListAsync(request.FilterModel);
        }
    }
}