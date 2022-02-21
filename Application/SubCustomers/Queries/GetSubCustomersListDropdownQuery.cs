using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.SubCustomers.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Queries
{
    public record GetSubCustomersListDropdownQuery : IRequest<IEnumerable<SubCustomerAccountDropdownListDTo>>;

    public class GetSubCustomersListDropdownHandler:IRequestHandler<GetSubCustomersListDropdownQuery,IEnumerable<SubCustomerAccountDropdownListDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;

        public GetSubCustomersListDropdownHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<SubCustomerAccountDropdownListDTo>> Handle(GetSubCustomersListDropdownQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.SubCustomerAccounts
                .Where(a => a.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid())
                .ProjectTo<SubCustomerAccountDropdownListDTo>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}