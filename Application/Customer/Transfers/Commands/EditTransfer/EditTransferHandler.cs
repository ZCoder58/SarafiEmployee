using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.CustomerAccounts.Commands.Transactions.RollbackTransaction;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.DepositAccountTransfer;
using Application.Customer.CustomerAccounts.Extensions;
using Application.Customer.ExchangeRates.Extensions;
using Application.Customer.Transfers.Commands.ForwardEditTransfer;
using Application.Customer.Transfers.EventHandlers;
using Application.Customer.Transfers.Extensions;
using AutoMapper;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

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
            var receiver = _dbContext.Friends.Include(a => a.Customer).GetById(request.FriendId);
            var isTheSameReceiver = targetTransfer.ReceiverId == receiver.CustomerFriendId;
            var fromCurrency = _dbContext.RatesCountries.GetById(request.FCurrency);
            var toCurrency = _dbContext.RatesCountries.GetById(request.TCurrency);
            if ((targetTransfer.SourceAmount + targetTransfer.Fee) != (request.Amount + request.Fee) ||
                targetTransfer.FromCurrency != fromCurrency.PriceName ||
                targetTransfer.ToCurrency != toCurrency.PriceName)
            {
                var targetTransaction =
                    _dbContext.CustomerAccountTransactions.GetByTransferId(targetTransfer.Id, targetTransfer.SenderId);
                await _mediator.Send(new CRollbackTransactionCommand(targetTransaction.Id, true), cancellationToken);
                var transactionMsg = string.Concat("از ارسال حواله با کد نمبر ", targetTransfer.CodeNumber, " به ",
                    receiver.Customer.Name, " ", receiver.Customer.FatherName, " دریافت گردید ");
                await _mediator.Send(new CDepositAccountTransferCommand(
                    true,
                    fromCurrency.Id,
                    (request.Amount + request.Fee),
                    transactionMsg,
                    targetTransfer.Id), cancellationToken);
            }

            _mapper.Map(request, targetTransfer);

            var targetExchangeRate = _dbContext.CustomerExchangeRates.GetExchangeRateById(
                _httpUserContext.GetCurrentUserId().ToGuid(),
                request.FCurrency, request.TCurrency);
            targetTransfer.SourceAmount = request.Amount;
            targetTransfer.DestinationAmount =
                _dbContext.CustomerExchangeRates.ConvertCurrencyById(
                    _httpUserContext.GetCurrentUserId().ToGuid(),
                    request.FCurrency,
                    request.TCurrency,
                    request.Amount,
                    request.ExchangeType);
            targetTransfer.FromRate = targetExchangeRate.FromAmount;
            targetTransfer.RateUpdated = targetExchangeRate.Updated;
            targetTransfer.ToCurrency = toCurrency.PriceName;
            targetTransfer.FromCurrency = fromCurrency.PriceName;
            targetTransfer.ReceiverId = receiver.CustomerFriendId;
            await _dbContext.SaveChangesAsync(cancellationToken);

            if (!isTheSameReceiver)
            {
                targetTransfer.Forwarded = false;
                await _mediator.Publish(new TransferCreated(targetTransfer.Id),
                    cancellationToken);
                if (targetTransfer.Forwarded)
                {
                    var forwardedList = _dbContext.Transfers.GetForwards(targetTransfer.Id);
                    _dbContext.Transfers.RemoveRange(forwardedList);
                    await _dbContext.SaveChangesAsync(cancellationToken);
                }
            }
            else
            {
                if (targetTransfer.Forwarded)
                {
                    var childForwarded =
                        _dbContext.Transfers.FirstOrDefault(a => a.ParentForwardedId == targetTransfer.Id);
                    await _mediator.Send(new ForwardEditTransferCommand()
                    {
                        Id = childForwarded.Id,
                        Comment = childForwarded.Comment,
                        CodeNumber = childForwarded.CodeNumber,
                        ReceiverFee = childForwarded.ReceiverFee,
                        EnableEditForwarded = true
                    }, cancellationToken);
                }

                await _mediator.Publish(new TransferEdited(), cancellationToken);
            }

            return Unit.Value;
        }
    }
}