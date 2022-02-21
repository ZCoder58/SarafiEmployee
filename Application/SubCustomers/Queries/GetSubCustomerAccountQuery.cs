using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.SubCustomers.DTOs;
using AutoMapper;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Queries
{
    public record GetSubCustomerAccountQuery(Guid Id):IRequest<SubCustomerAccountDTo>;
 public class GetSubCustomerAccountHandler:IRequestHandler<GetSubCustomerAccountQuery,SubCustomerAccountDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
    
        public GetSubCustomerAccountHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
        }
    
        public async Task<SubCustomerAccountDTo> Handle(GetSubCustomerAccountQuery request, CancellationToken cancellationToken)
        {
            var targetSubCustomer =await _dbContext.SubCustomerAccounts
                .FirstOrDefaultAsync(a => 
                    a.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.Id==request.Id,cancellationToken);
            if (targetSubCustomer.IsNull())
            {
                throw new EntityNotFoundException();
            }
            return _mapper.Map<SubCustomerAccountDTo>(targetSubCustomer);
        }
    }
   
}