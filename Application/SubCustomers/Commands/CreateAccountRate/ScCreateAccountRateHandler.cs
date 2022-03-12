using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit;
using Application.SubCustomers.Commands.Transactions.CreateTransaction;
using Application.SubCustomers.DTOs;
using Application.SubCustomers.Statics;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.SubCustomers.Commands.CreateAccountRate
{
    public class ScCreateAccountRateHandler : IRequestHandler<ScCreateAccountRateCommand, SubCustomerAccountRateDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public ScCreateAccountRateHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext,
            IMapper mapper, IMediator mediator)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
            _mediator = mediator;
        }

        public async Task<SubCustomerAccountRateDTo> Handle(ScCreateAccountRateCommand request,
            CancellationToken cancellationToken)
        {
            var newAccount =
                (await _dbContext.SubCustomerAccountRates.AddAsync(_mapper.Map<SubCustomerAccountRate>(request),
                    cancellationToken)).Entity;
            await _dbContext.SaveChangesAsync(cancellationToken);
            var targetRate = _dbContext.RatesCountries.GetById(request.RatesCountryId);
            newAccount.RatesCountry = targetRate;
            if (request.EnableTransaction) 
            { 
                await _mediator.Send(new CsCreateTransactionCommand()
                {
                    Amount = request.Amount,
                    PriceName = targetRate.PriceName,
                    Comment = "سرمایه اولیه اضافه شد",
                    TransactionType = TransactionTypes.Deposit,
                    SubCustomerAccountRateId = newAccount.Id
                }, cancellationToken);
            }
            if (request.AddToAccount)
            {
                await _mediator.Send(new CDepositAccountCommand(
                    true,
                    request.RatesCountryId,
                    request.Amount,
                    "",
                    false
                ),cancellationToken);
            }
            
            return _mapper.Map<SubCustomerAccountRateDTo>(newAccount);
        }
    }
}