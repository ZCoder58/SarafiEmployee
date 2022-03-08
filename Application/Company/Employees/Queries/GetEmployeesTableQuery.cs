using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Models;
using Application.Company.Employees.DTOs;
using Application.Company.Employees.Extensions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Company.Employees.Queries
{
    public record GetEmployeesTableQuery(TableFilterModel FilterModel) : IRequest<PaginatedList<EmployeeTableDTo>>;

    
    public class GetEmployeesTableHandler:IRequestHandler<GetEmployeesTableQuery,PaginatedList<EmployeeTableDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;

        public GetEmployeesTableHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
        }

        public async Task<PaginatedList<EmployeeTableDTo>> Handle(GetEmployeesTableQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.Customers.GetEmployees(_httpUserContext)
                .ProjectTo<EmployeeTableDTo>(_mapper.ConfigurationProvider).ToPaginatedListAsync(request.FilterModel);
        }
    }
}