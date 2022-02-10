using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.SunriseSuperAdmin.Rates.EventHandlers;
using AutoMapper;
using Domain.Interfaces;
using MediatR;

namespace Application.SunriseSuperAdmin.Rates.Commands.UpdateRate
{
    public class UpdateRateHandler:IRequestHandler<UpdateRateCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public UpdateRateHandler(IApplicationDbContext dbContext, IMapper mapper, IMediator mediator)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(UpdateRateCommand request, CancellationToken cancellationToken)
        {
            var targetRate = _dbContext.RatesCountries.GetById(request.Id);
            _mapper.Map(request, targetRate);
            if (request.FlagPhotoFile.IsNotNull())
            {
                targetRate.FlagPhoto = await request.FlagPhotoFile.SaveToAsync(RateCountyStatics.FlagsSavePath);
            }

            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new RateUpdated(),cancellationToken);

            return Unit.Value;
        }
    }
}