using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Customer.CustomerAccounts.DTOs;
using Application.SubCustomers.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.CustomerAccounts.Queries
{
    public record GetCustomerTransactionsFilterListQuery(DateTime FromDate, DateTime ToDate) :
        IRequest<IEnumerable<CustomerAccountTransactionDTo>>;

    public class GetSubCustomerTransactionFilterListHandler:IRequestHandler<GetCustomerTransactionsFilterListQuery,
        IEnumerable<CustomerAccountTransactionDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;
        public GetSubCustomerTransactionFilterListHandler(IApplicationDbContext dbContext, IMapper mapper, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
        }
    
        public async Task<IEnumerable<CustomerAccountTransactionDTo>> Handle(GetCustomerTransactionsFilterListQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.CustomerAccountTransactions
                .Where(a =>
                a.CustomerAccount.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                a.CreatedDate.Value.Date >= request.FromDate.Date &&
                a.CreatedDate.Value.Date <= request.ToDate.Date)
                .ProjectTo<CustomerAccountTransactionDTo>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}