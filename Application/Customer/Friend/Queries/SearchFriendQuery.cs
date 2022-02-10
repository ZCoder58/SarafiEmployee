using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Friend.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Friend.Queries
{
    public record SearchFriendQuery(string SearchText) : IRequest<IEnumerable<SearchFriendDTo>>;

    public class SearchFriendHandler:IRequestHandler<SearchFriendQuery,IEnumerable<SearchFriendDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        public SearchFriendHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<SearchFriendDTo>> Handle(SearchFriendQuery request, CancellationToken cancellationToken)
        {
            var search = request.SearchText.ToEmptyStringIfNull();
            return await _dbContext.Friends
                .Where(a => a.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                            a.CustomerFriendApproved)
                .Where(a => a.CustomerFriend.Name.Contains(search) ||
                            a.CustomerFriend.LastName.Contains(search) ||
                            a.CustomerFriend.Phone.Contains(search) ||
                            a.CustomerFriend.UserName.Contains(search) ||
                            a.CustomerFriend.DetailedAddress.Contains(search)
                )
                .OrderDescending()
                .ProjectTo<SearchFriendDTo>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}