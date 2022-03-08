using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Company.Agencies.Commands.CreateAgency
{
    public class CreateAgencyHandler:IRequestHandler<CreateAgencyCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;

        public CreateAgencyHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(CreateAgencyCommand request, CancellationToken cancellationToken)
        {
            await _dbContext.CompanyAgencies.AddAsync(new CompanyAgency()
            {
                Name = request.Name,
                CompanyInfoId = _httpUserContext.GetCompanyId().ToGuid()
            }, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}