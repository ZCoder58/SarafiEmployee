using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Friend.DTOs;
using AutoMapper;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Friend.Queries.GetFriendProfile
{
    public record GetFriendProfileQuery(Guid CustomerId) : IRequest<FriendProfileDTo>;

    public class GetFriendProfileHandler:IRequestHandler<GetFriendProfileQuery,FriendProfileDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        public GetFriendProfileHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        
        public  Task<FriendProfileDTo> Handle(GetFriendProfileQuery request, CancellationToken cancellationToken)
        {
            var targetCustomer = _dbContext.Customers.Include(a=>a.Country).GetById(request.CustomerId);
            if (targetCustomer.IsNull())
            {
                throw new EntityNotFoundException();
            }

            return  Task.FromResult(_mapper.Map<FriendProfileDTo>(targetCustomer));
        }
    }
}