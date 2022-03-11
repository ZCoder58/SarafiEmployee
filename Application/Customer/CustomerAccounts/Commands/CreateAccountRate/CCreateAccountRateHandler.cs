using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.CustomerAccounts.Commands.Transactions.CreateTransaction;
using Application.Customer.CustomerAccounts.DTOs;
using Application.SubCustomers.Statics;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.CreateAccountRate
{
    public class
        CCreateAccountRateHandler : IRequestHandler<CCreateAccountRateCommand, CustomerAccountRateDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public CCreateAccountRateHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext,
            IMapper mapper, IMediator mediator)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
            _mediator = mediator;
        }

        public async Task<CustomerAccountRateDTo> Handle(CCreateAccountRateCommand request,
            CancellationToken cancellationToken)
        {
            var targetRate = _dbContext.RatesCountries.GetById(request.RatesCountryId);
            var newAccount =
                (await _dbContext.CustomerAccounts.AddAsync(_mapper.Map<CustomerAccount>(request), cancellationToken))
                .Entity;
            newAccount.CustomerId = _httpUserContext.GetCurrentUserId().ToGuid();
            await _dbContext.SaveChangesAsync(cancellationToken);
           
            newAccount.RatesCountry = targetRate;
            return _mapper.Map<CustomerAccountRateDTo>(newAccount);
        }
    }
}