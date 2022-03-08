using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Customer.CustomerAccounts.DTOs;
using Application.SubCustomers.DTOs;
using AutoMapper;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.CustomerAccounts.Queries
{
    public record GetEditCustomerAccountRateQuery(Guid Id) : IRequest<EditCustomerAccountRateDTo>;

    public class GetEditCustomerAccountRateHandler:IRequestHandler<GetEditCustomerAccountRateQuery,EditCustomerAccountRateDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;
        public GetEditCustomerAccountRateHandler(IApplicationDbContext dbContext, IMapper mapper, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
        }

        public async Task<EditCustomerAccountRateDTo> Handle(GetEditCustomerAccountRateQuery request, CancellationToken cancellationToken)
        {
            var targetAccountRate = await _dbContext.CustomerAccounts
                .FirstOrDefaultAsync(a => a.Id == request.Id &&
                            a.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid(),cancellationToken);
            return _mapper.Map<EditCustomerAccountRateDTo>(targetAccountRate);
        }
    }
}