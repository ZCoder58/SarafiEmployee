using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using MediatR;

namespace Application.Company.Agencies.Commands.EditAgency
{
    public class EditAgencyHandler:IRequestHandler<EditAgencyCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        public EditAgencyHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(EditAgencyCommand request, CancellationToken cancellationToken)
        {
            var targetAgency = _dbContext.CompanyAgencies.GetById(request.Id);
            targetAgency.Name = request.Name;
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}