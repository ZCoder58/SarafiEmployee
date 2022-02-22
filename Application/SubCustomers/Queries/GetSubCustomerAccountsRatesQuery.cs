using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Models;
using Application.SubCustomers.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Queries
{
    public record GetSubCustomerAccountsRatesQuery(Guid SubCustomerId) : IRequest<IEnumerable<SubCustomerAccountRateDTo>>;

    public class GetSubCustomerAccountsRatesHandler:IRequestHandler<GetSubCustomerAccountsRatesQuery,IEnumerable<SubCustomerAccountRateDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;
        public GetSubCustomerAccountsRatesHandler(IApplicationDbContext dbContext, IMapper mapper, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
        }

        public async Task<IEnumerable<SubCustomerAccountRateDTo>> Handle(GetSubCustomerAccountsRatesQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.SubCustomerAccountRates
                .Include(a => a.SubCustomerAccount)
                .Where(a => a.SubCustomerAccountId == request.SubCustomerId &&
                            a.SubCustomerAccount.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid())
                .ProjectTo<SubCustomerAccountRateDTo>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}