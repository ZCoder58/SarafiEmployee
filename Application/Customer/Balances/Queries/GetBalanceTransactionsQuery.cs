using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Models;
using Application.Customer.Balances.DTOs;
using Application.Customer.Friend.Extensions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Balances.Queries
{
    public record GetBalanceTransactionsQuery(TableFilterModel Filter,Guid FId) : IRequest<PaginatedList<BalanceTransactionTableDTo>>;

    public class GetBalanceTransactionHandler:IRequestHandler<GetBalanceTransactionsQuery,PaginatedList<BalanceTransactionTableDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        public GetBalanceTransactionHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
        }

        public async Task<PaginatedList<BalanceTransactionTableDTo>> Handle(GetBalanceTransactionsQuery request, CancellationToken cancellationToken)
        {
           
            if (!_dbContext.Friends.IsCustomerApprovedFriend(_httpUserContext.GetCurrentUserId().ToGuid(),
                request.FId))
            {
                throw new EntityNotFoundException();
            }

            var targetFriend = _dbContext.Friends.GetById(request.FId);
            return await _dbContext.CustomerBalanceTransactions
                .Include(a=>a.CustomerBalance)
                .Where(a =>
                    (a.CustomerBalance.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                     a.CustomerBalance.CustomerFriendId==targetFriend.CustomerFriendId) ||
                    (a.CustomerBalance.CustomerId == targetFriend.CustomerFriendId &&
                     a.CustomerBalance.CustomerFriendId==_httpUserContext.GetCurrentUserId().ToGuid()))
                .OrderDescending()
                .ProjectTo<BalanceTransactionTableDTo>(_mapper.ConfigurationProvider)
                .ToPaginatedListAsync(request.Filter);
        }
    }
}