using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.SubCustomers.Commands.Transactions.CreateTransaction;
using Application.SubCustomers.DTOs;
using Application.SubCustomers.Statics;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.SubCustomers.Commands.CreateAccountRate
{
    public class CreateAccountRateHandler : IRequestHandler<CreateAccountRateCommand, SubCustomerAccountRateDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public CreateAccountRateHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext,
            IMapper mapper, IMediator mediator)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
            _mediator = mediator;
        }

        public async Task<SubCustomerAccountRateDTo> Handle(CreateAccountRateCommand request,
            CancellationToken cancellationToken)
        {
            var newAccount =
                (await _dbContext.SubCustomerAccountRates.AddAsync(_mapper.Map<SubCustomerAccountRate>(request),
                    cancellationToken)).Entity;
            await _dbContext.SaveChangesAsync(cancellationToken);
            var targetRate = _dbContext.RatesCountries.GetById(request.RatesCountryId);
            newAccount.RatesCountry = targetRate;
            await _mediator.Send(new CreateTransactionCommand()
            {
                Amount = request.Amount,
                PriceName = targetRate.PriceName,
                Comment = "سرمایه اولیه اضافه شد",
                TransactionType = TransactionTypes.Deposit,
                SubCustomerAccountRateId = newAccount.Id
            }, cancellationToken);
            return _mapper.Map<SubCustomerAccountRateDTo>(newAccount);
        }
    }
}