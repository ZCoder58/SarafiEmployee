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
using Microsoft.EntityFrameworkCore;

namespace Application.Company.Agencies.Queries
{
    public record GetAgenciesSelectQuery() : IRequest<IEnumerable<AgenciesSelectDTo>>;

    public class GetAgenciesSelectHandler:IRequestHandler<GetAgenciesSelectQuery,IEnumerable<AgenciesSelectDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        public GetAgenciesSelectHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AgenciesSelectDTo>> Handle(GetAgenciesSelectQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.CompanyAgencies
                .OrderDescending()
                .Where(a => a.CompanyInfoId == _httpUserContext.GetCompanyId().ToGuid())
                .ProjectTo<AgenciesSelectDTo>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}