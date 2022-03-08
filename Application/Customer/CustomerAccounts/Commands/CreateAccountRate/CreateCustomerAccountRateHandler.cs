using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.CustomerAccounts.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.CreateAccountRate
{
    public class CreateCustomerAccountRateHandler:IRequestHandler<CreateCustomerAccountRateCommand,CustomerAccountRateDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;

        public CreateCustomerAccountRateHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
        }

        public async Task<CustomerAccountRateDTo> Handle(CreateCustomerAccountRateCommand request, CancellationToken cancellationToken)
        {
           var newAccount=(await _dbContext.CustomerAccounts.AddAsync(_mapper.Map<CustomerAccount>(request),cancellationToken)).Entity;
           newAccount.CustomerId = _httpUserContext.GetCurrentUserId().ToGuid();
           await _dbContext.SaveChangesAsync(cancellationToken);
           var targetRate = _dbContext.RatesCountries.GetById(request.RatesCountryId);
           newAccount.RatesCountry = targetRate;
           return _mapper.Map<CustomerAccountRateDTo>(newAccount);
        }
    }
}