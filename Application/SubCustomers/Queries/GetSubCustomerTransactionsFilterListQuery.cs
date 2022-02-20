using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.SubCustomers.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Queries
{
    public record GetSubCustomerTransactionsFilterListQuery(Guid SubCustomerId,DateTime FromDate, DateTime ToDate) :
        IRequest<IEnumerable<SubCustomerTransactionDTo>>;

    public class GetSubCustomerTransactionFilterListHandler:IRequestHandler<GetSubCustomerTransactionsFilterListQuery,IEnumerable<SubCustomerTransactionDTo>>
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

        public async Task<IEnumerable<SubCustomerTransactionDTo>> Handle(GetSubCustomerTransactionsFilterListQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.SubCustomerTransactions.Where(a =>
                a.SubCustomerAccountId == request.SubCustomerId &&
                a.SubCustomerAccount.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                a.CreatedDate.Value.Date >= request.FromDate.Date ||
                a.CreatedDate.Value.Date <= request.ToDate.Date).ProjectTo<SubCustomerTransactionDTo>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);
        }
    }
}