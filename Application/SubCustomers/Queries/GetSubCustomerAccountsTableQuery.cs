using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Models;
using Application.SubCustomers.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;

namespace Application.SubCustomers.Queries
{
    public record GetSubCustomerAccountsTableQuery(TableFilterModel FilterModel):IRequest<PaginatedList<SubCustomerTableDTo>>;

    public class GetSubCustomerAccountsTableHandler:IRequestHandler<GetSubCustomerAccountsTableQuery,PaginatedList<SubCustomerTableDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;
        public GetSubCustomerAccountsTableHandler(IApplicationDbContext dbContext, IMapper mapper, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
        }
    
        public async Task<PaginatedList<SubCustomerTableDTo>> Handle(GetSubCustomerAccountsTableQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.SubCustomerAccounts
                .Where(a => a.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid())
                .ProjectTo<SubCustomerTableDTo>(_mapper.ConfigurationProvider)
                .ToPaginatedListAsync(request.FilterModel);
        }
    }
}