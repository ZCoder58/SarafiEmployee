using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Friend.DTOs;
using Application.Customer.Friend.Extensions;
using AutoMapper;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Friend.Queries
{
    public record GetFriendInfoQuery(Guid FriendId) : IRequest<SearchFriendDTo>;

    public class GetFriendInfoHandler:IRequestHandler<GetFriendInfoQuery,SearchFriendDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;

        public GetFriendInfoHandler(IApplicationDbContext dbContext, IMapper mapper, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
        }

        public  Task<SearchFriendDTo> Handle(GetFriendInfoQuery request, CancellationToken cancellationToken)
        {
            var targetFriend = _dbContext.Friends
                .Include(a=>a.CustomerFriend)
                .Where(a => a.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid())
                .GetById(request.FriendId);
            if (targetFriend.IsNull())
            {
                throw new EntityNotFoundException();
            }

            return Task.FromResult(_mapper.Map<SearchFriendDTo>(targetFriend));
        }
    }
}