using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.SunriseSuperAdmin.Rates.DTos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Queries
{
    public record GetSubCustomerCountryRatesQuery(Guid SubCustomerId) : IRequest<IEnumerable<RateDTo>>;

    public class GetSubCustomerCountryHandler:IRequestHandler<GetSubCustomerCountryRatesQuery,IEnumerable<RateDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        public GetSubCustomerCountryHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RateDTo>> Handle(GetSubCustomerCountryRatesQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.SubCustomerAccountRates
                .Include(a => a.RatesCountry)
                .Include(a => a.SubCustomerAccount)
                .Where(a => a.SubCustomerAccountId == request.SubCustomerId &&
                            a.SubCustomerAccount.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid()
                ).Select(a=>a.RatesCountry)
                .ProjectTo<RateDTo>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}