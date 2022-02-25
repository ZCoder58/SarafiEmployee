using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Company.Employees.DTOs;
using Application.Company.Employees.Extensions;
using AutoMapper;
using Domain.Interfaces;
using MediatR;

namespace Application.Company.Employees.Queries
{
    public record GetEditEmployeeQuery(Guid EmployeeId) : IRequest<EditEmployeeDTo>;

    public class GetEditEmployeeHandler:IRequestHandler<GetEditEmployeeQuery,EditEmployeeDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;

        public GetEditEmployeeHandler(IApplicationDbContext dbContext, IMapper mapper, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
        }

        public  Task<EditEmployeeDTo> Handle(GetEditEmployeeQuery request, CancellationToken cancellationToken)
        {
            var targetEmployee = _dbContext.Customers.GetEmployees(_httpUserContext)
                .GetById(request.EmployeeId);
            if (targetEmployee.IsNull())
            {
                throw new EntityNotFoundException();
            }
            return Task.FromResult(_mapper.Map<EditEmployeeDTo>(targetEmployee));
        }
    }
}