﻿using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.CustomerAccounts.Commands.CreateAccountRate;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Withdrawal;
using Application.Customer.CustomerAccounts.Extensions;
using Application.Customer.ExchangeRates.Extensions;
using Application.Customer.Transfers.Commands.CreateTransfer;
using Application.Customer.Transfers.EventHandlers;
using Application.Customer.Transfers.Statics;
using Application.SubCustomers.Commands.UpdateAccountAmount.Deposit;
using Application.SubCustomers.Commands.UpdateAccountAmount.Withdrawal;
using Application.SubCustomers.Commands.UpdateAccountAmount.WithdrawalTransfer;
using Application.SubCustomers.Statics;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.SubCustomers.Commands.CreateTransfer
{
    public class SubCustomerCreateTransferHandler : IRequestHandler<SubCustomerCreateTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly IHttpUserContext _httpUserContext;
        public SubCustomerCreateTransferHandler(IApplicationDbContext dbContext, IMapper mapper,IMediator mediator, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(SubCustomerCreateTransferCommand request, CancellationToken cancellationToken)
        {
            var newTransfer = _mapper.Map<Transfer>(request);
            var receiver = _dbContext.Friends.GetById(request.FriendId);
            var targetSubCustomerAccountRate =
                _dbContext.SubCustomerAccountRates.GetById(request.SubCustomerAccountRateId);
            var fromCurrency = _dbContext.RatesCountries.GetById(targetSubCustomerAccountRate.RatesCountryId);
            var toCurrency = _dbContext.RatesCountries.GetById(request.TCurrency);
            var targetExchangeRate=_dbContext.CustomerExchangeRates.GetExchangeRateById(_httpUserContext.GetCurrentUserId().ToGuid(),
                fromCurrency.Id, request.TCurrency);
            newTransfer.SourceAmount = request.Amount;
            newTransfer.DestinationAmount = 
                _dbContext.CustomerExchangeRates.ConvertCurrencyById(
                    _httpUserContext.GetCurrentUserId().ToGuid(),
                    fromCurrency.Id,
                    request.TCurrency,
                    request.Amount,
                    request.ExchangeType);
            newTransfer.ToRate = (request.ExchangeType=="buy"?
                targetExchangeRate.ToExchangeRateBuy:targetExchangeRate.ToExchangeRateSell);
            newTransfer.FromRate = targetExchangeRate.FromAmount;
            newTransfer.RateUpdated = targetExchangeRate.Updated;
            newTransfer.ToCurrency = toCurrency.PriceName;
            newTransfer.FromCurrency = fromCurrency.PriceName;
            newTransfer.State = TransfersStatusTypes.InProgress;
            newTransfer.ReceiverId = receiver.CustomerFriendId;
            newTransfer.SenderId = receiver.CustomerId;
            newTransfer.AccountType =TransferAccountTypesStatic.SubCustomerAccount;
            await _dbContext.Transfers.AddAsync(newTransfer, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Send(new CsWithdrawalAccountTransferCommand(
                request.SubCustomerAccountId,
                request.SubCustomerAccountRateId,
                request.Amount + request.Fee,
                string.Concat("برای حواله با کد نمبر ", request.CodeNumber, "به ", 
                    request.ToName," ",request.ToLastName," ولد",request.ToFatherName," ارسال گردید"),
                newTransfer.Id),cancellationToken);
            await _mediator.Publish(new TransferCreated(newTransfer.Id), cancellationToken);
            return Unit.Value;
        }
    }
}