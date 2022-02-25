using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.ExchangeRates.Extensions;
using Application.Customer.Transfers.EventHandlers;
using AutoMapper;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Transfers.Commands.EditTransfer
{
    public class EditTransferHandler : IRequestHandler<EditTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly IHttpUserContext _httpUserContext;

        public EditTransferHandler(IApplicationDbContext dbContext, IMapper mapper, IMediator mediator,
            IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(EditTransferCommand request, CancellationToken cancellationToken)
        {
            var targetTransfer = _dbContext.Transfers.GetById(request.Id);
            var receiver = _dbContext.Friends.GetById(request.FriendId);
            var isTheSameReceiver = targetTransfer.ReceiverId == receiver.CustomerFriendId;
            _mapper.Map(request, targetTransfer);
            var fromCurrency = _dbContext.RatesCountries.GetById(request.FCurrency);
            var toCurrency = _dbContext.RatesCountries.GetById(request.TCurrency);
            var targetExchangeRate = _dbContext.CustomerExchangeRates.GetExchangeRateById(
                _httpUserContext.GetCurrentUserId().ToGuid(),
                request.FCurrency, request.TCurrency);
            targetTransfer.SourceAmount = request.Amount;
            targetTransfer.DestinationAmount =
                ((request.Amount / targetExchangeRate.FromAmount) * targetExchangeRate.ToExchangeRate).ToString().ToDoubleFormatted();            targetTransfer.ToRate = targetExchangeRate.ToExchangeRate;
            targetTransfer.FromRate = targetExchangeRate.FromAmount;
            targetTransfer.RateUpdated = targetExchangeRate.Updated;
            targetTransfer.ToCurrency = toCurrency.PriceName;
            targetTransfer.FromCurrency = fromCurrency.PriceName;
            targetTransfer.ReceiverId = receiver.CustomerFriendId;
            await _dbContext.SaveChangesAsync(cancellationToken);
            if (!isTheSameReceiver)
            {
                await _mediator.Publish(new TransferCreated(receiver.CustomerFriendId.ToGuid(),targetTransfer.Id), cancellationToken);
            }
            else
            {
                await _mediator.Publish(new TransferEdited(), cancellationToken);
            }
            return Unit.Value;
        }
    }
}