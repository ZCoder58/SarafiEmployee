using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.DepositAccountTransfer;
using Application.Customer.ExchangeRates.Extensions;
using Application.Customer.Transfers.EventHandlers;
using Application.Customer.Transfers.Statics;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Transfers.Commands.CreateTransfer
{
    public class CreateTransferHandler : IRequestHandler<CreateTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly IHttpUserContext _httpUserContext;

        public CreateTransferHandler(IApplicationDbContext dbContext, IMapper mapper, IMediator mediator,
            IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(CreateTransferCommand request, CancellationToken cancellationToken)
        {
            var newTransfer = _mapper.Map<Transfer>(request);
            var receiver = _dbContext.Friends.Include(a => a.Customer).GetById(request.FriendId);
            var fromCurrency = _dbContext.RatesCountries.GetById(request.FCurrency);
            var toCurrency = _dbContext.RatesCountries.GetById(request.TCurrency);
            var targetExchangeRate = _dbContext.CustomerExchangeRates.GetExchangeRateById(
                _httpUserContext.GetCurrentUserId().ToGuid(),
                request.FCurrency, request.TCurrency);
            newTransfer.SourceAmount = request.Amount;
            newTransfer.DestinationAmount = _dbContext.CustomerExchangeRates.ConvertCurrencyById(
                _httpUserContext.GetCurrentUserId().ToGuid(),
                request.FCurrency,
                request.TCurrency,
                request.Amount,
                request.ExchangeType);
            newTransfer.ToRate = (request.ExchangeType == "buy"
                ? targetExchangeRate.ToExchangeRateBuy
                : targetExchangeRate.ToExchangeRateSell);
            newTransfer.FromRate = targetExchangeRate.FromAmount;
            newTransfer.RateUpdated = targetExchangeRate.Updated;
            newTransfer.ToCurrency = toCurrency.PriceName;
            newTransfer.FromCurrency = fromCurrency.PriceName;
            newTransfer.State = TransfersStatusTypes.InProgress;
            newTransfer.ReceiverId = receiver.CustomerFriendId;
            newTransfer.SenderId = receiver.CustomerId;
            newTransfer.AccountType = TransferAccountTypesStatic.MyAccount;

            await _dbContext.Transfers.AddAsync(newTransfer, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            var transactionMsg = string.Concat("از ارسال حواله با کد نمبر ", request.CodeNumber, " به ",
                receiver.Customer.Name, " ", receiver.Customer.FatherName, " دریافت گردید ");

            await _mediator.Send(new CDepositAccountTransferCommand(
                true,
                fromCurrency.Id,
                (request.Amount + request.Fee),
                transactionMsg,
                newTransfer.Id), cancellationToken);

            await _mediator.Publish(new TransferCreated(receiver.CustomerFriendId.ToGuid(), newTransfer.Id),
                cancellationToken);
            return Unit.Value;
        }
    }
}