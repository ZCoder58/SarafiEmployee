using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Models;
using Application.SunriseSuperAdmin.Customers.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;

namespace Application.SunriseSuperAdmin.Customers.Queries
{
    public record GetUsersListQuery(TableFilterModel Model) : IRequest<PaginatedList<UserDto>>;

    public class GetUsersListQueryHandler:IRequestHandler<GetUsersListQuery,PaginatedList<UserDto>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        public GetUsersListQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<PaginatedList<UserDto>> Handle(GetUsersListQuery request, CancellationToken cancellationToken)
        {
            
            return await _dbContext.Customers.ProjectTo<UserDto>(_mapper.ConfigurationProvider).ToPaginatedListAsync(request.Model);
        }
    }
}