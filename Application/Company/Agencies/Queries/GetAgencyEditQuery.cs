using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Company.Agencies.DTOs;
using AutoMapper;
using Domain.Interfaces;
using MediatR;

namespace Application.Company.Agencies.Queries
{
    public record GetAgencyEditQuery(Guid Id) : IRequest<AgencyEditDTo>;

    public class GetAgencyEditHandler:IRequestHandler<GetAgencyEditQuery,AgencyEditDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;

        public GetAgencyEditHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
        }

        public  Task<AgencyEditDTo> Handle(GetAgencyEditQuery request, CancellationToken cancellationToken)
        {
            var targetAgency = _dbContext.CompanyAgencies.GetById(request.Id);
            if (targetAgency.IsNull() || targetAgency.CompanyInfoId != _httpUserContext.GetCompanyId().ToGuid())
            {
                throw new EntityNotFoundException();
            }

            return Task.FromResult(_mapper.Map<AgencyEditDTo>(targetAgency));
        }
    }
}