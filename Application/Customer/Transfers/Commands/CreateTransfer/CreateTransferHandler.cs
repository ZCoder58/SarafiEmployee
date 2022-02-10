using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Interfaces;
using Application.Common.Statics;
using Application.Customer.ExchangeRates.Extensions;
using Application.Customer.Transfers.Commands.EventHandlers;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Transfers.Commands.CreateTransfer
{
    public class CreateTransferHandler : IRequestHandler<CreateTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly IHttpUserContext _httpUserContext;
        public CreateTransferHandler(IApplicationDbContext dbContext, IMapper mapper,IMediator mediator, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(CreateTransferCommand request, CancellationToken cancellationToken)
        {
            var newTransfer = _mapper.Map<Transfer>(request);
            var receiver = _dbContext.Friends.GetById(request.FriendId);
            var fromCurrency = _dbContext.RatesCountries.GetById(request.FCurrency);
            var toCurrency = _dbContext.RatesCountries.GetById(request.TCurrency);
            var targetExchangeRate=_dbContext.CustomerExchangeRates.GetExchangeRateById(_httpUserContext.GetCurrentUserId().ToGuid(),
                request.FCurrency, request.TCurrency);
            newTransfer.SourceAmount = request.Amount;
            newTransfer.DestinationAmount = (request.Amount/targetExchangeRate.FromAmount)*targetExchangeRate.ToExchangeRate;
            newTransfer.ToRate = targetExchangeRate.ToExchangeRate;
            newTransfer.ToCurrency = toCurrency.PriceName;
            newTransfer.FromCurrency = fromCurrency.PriceName;
            newTransfer.State = TransfersStatusTypes.InProgress;
            newTransfer.ReceiverId = receiver.CustomerFriendId;
            newTransfer.SenderId = receiver.CustomerId;
            await _dbContext.Transfers.AddAsync(newTransfer, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new TransferCreated(receiver.CustomerFriendId.ToGuid()), cancellationToken);
            return Unit.Value;
        }
    }
}