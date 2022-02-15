using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Friend.DTOs;
using Application.Customer.Friend.Extensions;
using AutoMapper;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Friend.Queries.GetFriendProfile
{
    public record GetFriendProfileQuery(Guid CustomerId) : IRequest<FriendProfileDTo>;

    public class GetFriendProfileHandler : IRequestHandler<GetFriendProfileQuery, FriendProfileDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;

        public GetFriendProfileHandler(IApplicationDbContext dbContext, IMapper mapper,
            IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
        }

        public Task<FriendProfileDTo> Handle(GetFriendProfileQuery request, CancellationToken cancellationToken)
        {
            var targetCustomer = _dbContext.Customers.Include(a => a.Country).GetById(request.CustomerId);
            if (targetCustomer.IsNull())
            {
                throw new EntityNotFoundException();
            }

            var profile = _mapper.Map<FriendProfileDTo>(targetCustomer);
            var friendRequest =
                _dbContext.Friends.GetFriendRequest(_httpUserContext.GetCurrentUserId().ToGuid(), targetCustomer.Id);
            if (friendRequest.IsNotNull())
            {
                profile.State = friendRequest.State;
                profile.FId = friendRequest.CustomerFriendId.ToGuid();
            }
            else
            {
                profile.State = FriendRequestStates.NotSend;
            }

            return Task.FromResult(profile);
        }
    }
}