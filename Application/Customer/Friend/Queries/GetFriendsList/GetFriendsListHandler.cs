using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Models;
using Application.Customer.Friend.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Friend.Queries.GetFriendsList
{
    public class GetFriendsListHandler:IRequestHandler<GetFriendsListQuery,IEnumerable<FriendsListDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        public GetFriendsListHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<FriendsListDTo>> Handle(GetFriendsListQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.Friends
                .Where(a =>
                    a.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.CustomerFriendApproved)
                .OrderDescending()
                .ProjectTo<FriendsListDTo>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);
        }
    }
}