using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.SunriseSuperAdmin.Rates.EventHandlers;
using Domain.Interfaces;
using MediatR;

namespace Application.SunriseSuperAdmin.Rates.Commands.DeleteRate
{
    public class DeleteRateHandler:IRequestHandler<DeleteRateCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;
        public DeleteRateHandler(IApplicationDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(DeleteRateCommand request, CancellationToken cancellationToken)
        {
            var targetRate = _dbContext.RatesCountries.GetById(request.Id);
            _dbContext.RatesCountries.Remove(targetRate);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new RateDeleted(),cancellationToken);

            return Unit.Value;
        }
    }
}