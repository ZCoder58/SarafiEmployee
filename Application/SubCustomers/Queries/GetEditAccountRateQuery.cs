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
    public record GetEditAccountRateQuery(Guid SubCustomerAccountRateId) : IRequest<EditSubCustomerAccountRateDTo>;

    public class GetEditAccountRateHandler:IRequestHandler<GetEditAccountRateQuery,EditSubCustomerAccountRateDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;
        public GetEditAccountRateHandler(IApplicationDbContext dbContext, IMapper mapper, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
        }

        public async Task<EditSubCustomerAccountRateDTo> Handle(GetEditAccountRateQuery request, CancellationToken cancellationToken)
        {
            var targetAccountRate = await _dbContext.SubCustomerAccountRates
                .Include(a => a.SubCustomerAccount)
                .FirstOrDefaultAsync(a => a.Id == request.SubCustomerAccountRateId &&
                            a.SubCustomerAccount.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid(),cancellationToken);
            return _mapper.Map<EditSubCustomerAccountRateDTo>(targetAccountRate);
        }
    }
}