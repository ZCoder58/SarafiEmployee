using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Models;
using Application.Common.Statics;
using Application.SunriseSuperAdmin.Customers.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;

namespace Application.SunriseSuperAdmin.Customers.Queries
{
    public record MGetCustomersTableQuery(TableFilterModel Model) : IRequest<PaginatedList<MCustomerTableDTo>>;

    public class MGetCustomersTableHandler:IRequestHandler<MGetCustomersTableQuery,PaginatedList<MCustomerTableDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        public MGetCustomersTableHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<PaginatedList<MCustomerTableDTo>> Handle(MGetCustomersTableQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.Customers.Where(a=>a.UserType!=UserTypes.EmployeeType).ProjectTo<MCustomerTableDTo>(_mapper.ConfigurationProvider).ToPaginatedListAsync(request.Model);
        }
    }
}