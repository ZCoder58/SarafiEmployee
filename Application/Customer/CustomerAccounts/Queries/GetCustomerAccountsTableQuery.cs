using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Models;
using Application.Customer.CustomerAccounts.DTOs;
using Application.SubCustomers.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.CustomerAccounts.Queries
{
    public record GetCustomerAccountsTableQuery(TableFilterModel FilterModel) : IRequest<PaginatedList<CustomerAccountRateDTo>>;

    public class GetCustomerAccountsTableHandler:IRequestHandler<GetCustomerAccountsTableQuery,PaginatedList<CustomerAccountRateDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;
        public GetCustomerAccountsTableHandler(IApplicationDbContext dbContext, IMapper mapper, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
        }

        public async Task<PaginatedList<CustomerAccountRateDTo>> Handle(GetCustomerAccountsTableQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.CustomerAccounts
                .Where(a => a.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid())
                .ProjectTo<CustomerAccountRateDTo>(_mapper.ConfigurationProvider)
                .ToPaginatedListAsync(request.FilterModel);
        }
    }
}