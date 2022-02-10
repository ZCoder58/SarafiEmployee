using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Profile.DTOs;
using AutoMapper;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Profile.Queries
{
    public class GetCustomerProfileQuery:IRequest<CustomerEditProfileDTo>
    {
        
    }

    public class GetCustomerProfileHandler:IRequestHandler<GetCustomerProfileQuery,CustomerEditProfileDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        public GetCustomerProfileHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
        }

        public async Task<CustomerEditProfileDTo> Handle(GetCustomerProfileQuery request, CancellationToken cancellationToken)
        {
            var targetUser = _dbContext.Customers
                .GetById(_httpUserContext.GetCurrentUserId().ToGuid());
           var targetEditModel= _mapper.Map<CustomerEditProfileDTo>(targetUser);
           return await Task.FromResult(targetEditModel);
        }
    }
}