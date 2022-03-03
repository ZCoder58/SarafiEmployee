using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.ExchangeRates.Extensions;
using Application.Customer.Transfers.EventHandlers;
using Application.SubCustomers.Commands.Transactions.RollbackTransaction;
using Application.SubCustomers.Commands.UpdateAccountAmount.Withdrawal;
using Application.SubCustomers.Commands.UpdateAccountAmount.WithdrawalTransfer;
using Application.SubCustomers.Statics;
using AutoMapper;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.EditTransfer
{
    public class SubCustomerEditTransferHandler : IRequestHandler<SubCustomerEditTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly IHttpUserContext _httpUserContext;

        public SubCustomerEditTransferHandler(IApplicationDbContext dbContext, IMapper mapper, IMediator mediator,
            IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(SubCustomerEditTransferCommand request, CancellationToken cancellationToken)
        {
            var targetTransfer = _dbContext.Transfers.GetById(request.Id);
            var receiver = _dbContext.Friends.GetById(request.FriendId);
            
            var targetSubCustomerAccountRate =
                _dbContext.SubCustomerAccountRates.GetById(request.SubCustomerAccountRateId);
            var fromCurrency = _dbContext.RatesCountries.GetById(targetSubCustomerAccountRate.RatesCountryId);
            var toCurrency = _dbContext.RatesCountries.GetById(request.TCurrency);
            var targetExchangeRate = _dbContext.CustomerExchangeRates.GetExchangeRateById(
                _httpUserContext.GetCurrentUserId().ToGuid(),
                fromCurrency.Id, request.TCurrency);
            var lastSubCustomerAccountRate = _dbContext.SubCustomerAccountRates
                .Include(a=>a.RatesCountry)
                .FirstOrDefault(a => 
                    a.SubCustomerAccountId==targetTransfer.SubCustomerAccountId &&
                    a.RatesCountry.PriceName == targetTransfer.FromCurrency);
            var newSubCustomerAccountRate = _dbContext.SubCustomerAccountRates
                .Include(a=>a.RatesCountry)
                .FirstOrDefault(a => 
                    a.SubCustomerAccountId==targetTransfer.SubCustomerAccountId &&
                    a.Id==request.SubCustomerAccountRateId);

            if (lastSubCustomerAccountRate.Id != newSubCustomerAccountRate.Id ||
                (request.Amount+request.Fee) !=(targetTransfer.SourceAmount+targetTransfer.Fee))
            {
                var lastSubCustomerTransaction = _dbContext.SubCustomerTransactions.FirstOrDefault(a=>
                    a.TransferId==targetTransfer.Id);
                await _mediator.Send(new RollbackTransactionCommand(lastSubCustomerTransaction.Id,true), cancellationToken);
                await _mediator.Send(new WithdrawalTransferSubCustomerAccountAmountCommand(request.SubCustomerAccountId,
                    request.SubCustomerAccountRateId,
                    request.Amount + request.Fee,
                    string.Concat("برای حواله با کد نمبر ", targetTransfer.CodeNumber, "به ", 
                        request.ToName," ",request.ToLastName," ولد",request.ToFatherName," ارسال گردید"),
                    targetTransfer.Id),cancellationToken);
            }
            targetTransfer.SourceAmount = request.Amount;
            targetTransfer.DestinationAmount =
                ((request.Amount / targetExchangeRate.FromAmount) * targetExchangeRate.ToExchangeRate).ToString().ToDoubleFormatted();
            targetTransfer.ToRate = targetExchangeRate.ToExchangeRate;
            targetTransfer.FromRate = targetExchangeRate.FromAmount;
            targetTransfer.RateUpdated = targetExchangeRate.Updated;
            targetTransfer.ToCurrency = toCurrency.PriceName;
            targetTransfer.FromCurrency = fromCurrency.PriceName;
            targetTransfer.ReceiverId = receiver.CustomerFriendId;
          
            _mapper.Map(request, targetTransfer);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new TransferEdited(), cancellationToken);
            return Unit.Value;
        }
    }
}