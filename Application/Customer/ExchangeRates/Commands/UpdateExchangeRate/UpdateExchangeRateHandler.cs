using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.Customer.ExchangeRates.EventHandlers;
using AutoMapper;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.ExchangeRates.Commands.UpdateExchangeRate
{
    public class UpdateExchangeRateHandler:IRequestHandler<UpdateExchangeRateCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public UpdateExchangeRateHandler(IApplicationDbContext dbContext, IMapper mapper, IMediator mediator)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(UpdateExchangeRateCommand request, CancellationToken cancellationToken)
        {
            var targetExchangeRate = _dbContext.CustomerExchangeRates.GetById(request.ExchangeRateId);
            _mapper.Map(request, targetExchangeRate);
            targetExchangeRate.Updated = true;
           await _dbContext.SaveChangesAsync(cancellationToken);
           await _mediator.Publish(new CustomerExchangeRateUpdated(),cancellationToken);
           return Unit.Value;
        }
    }
}