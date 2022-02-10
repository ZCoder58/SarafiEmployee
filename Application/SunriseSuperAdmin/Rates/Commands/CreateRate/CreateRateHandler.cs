using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Statics;
using Application.SunriseSuperAdmin.Rates.EventHandlers;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.SunriseSuperAdmin.Rates.Commands.CreateRate
{
    public class CreateRateHandler:IRequestHandler<CreateRateCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public CreateRateHandler(IApplicationDbContext dbContext, IMapper mapper, IMediator mediator)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(CreateRateCommand request, CancellationToken cancellationToken)
        {
            var newCountryRate = _mapper.Map<RatesCountry>(request);
            if (request.FlagPhotoFile.IsNotNull())
            {
                newCountryRate.FlagPhoto = await request.FlagPhotoFile.SaveToAsync(RateCountyStatics.FlagsSavePath);
            }
            await _dbContext.RatesCountries.AddAsync(newCountryRate, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new RateAdded(),cancellationToken);
            return Unit.Value;
        }
    }
}