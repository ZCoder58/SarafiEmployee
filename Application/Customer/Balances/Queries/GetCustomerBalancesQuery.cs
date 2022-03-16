using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Models;
using Application.Customer.Balances.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Balances.Queries
{
    public record GetCustomerBalancesQuery(TableFilterModel Filter,Guid FriendId) : IRequest<PaginatedList<CustomerBalanceDTo>>;

    public class GetCustomerBalancesHandler:IRequestHandler<GetCustomerBalancesQuery,PaginatedList<CustomerBalanceDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        public GetCustomerBalancesHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
        }

        public async Task<PaginatedList<CustomerBalanceDTo>> Handle(GetCustomerBalancesQuery request, CancellationToken cancellationToken)
        {
            var targetFriend = _dbContext.Friends
                .Where(a => a.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid())
                .GetById(request.FriendId);
            if (targetFriend.IsNull())
            {
                throw new EntityNotFoundException();
            }

            return await _dbContext.CustomerBalances
                .Where(a => a.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                            a.CustomerFriendId == targetFriend.CustomerFriendId)
                .ProjectTo<CustomerBalanceDTo>(_mapper.ConfigurationProvider)
                .ToPaginatedListAsync(request.Filter);
        }
    }
}