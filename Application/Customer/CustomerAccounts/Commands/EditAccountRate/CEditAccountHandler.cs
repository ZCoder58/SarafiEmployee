using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.Customer.CustomerAccounts.DTOs;
using Application.SubCustomers.DTOs;
using AutoMapper;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.CustomerAccounts.Commands.EditAccountRate
{
    public class CEditAccountHandler:IRequestHandler<CEditAccountCommand,CustomerAccountRateDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        public CEditAccountHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<CustomerAccountRateDTo> Handle(CEditAccountCommand request, CancellationToken cancellationToken)
        {
            var targetAccountRate = _dbContext.CustomerAccounts
                .Include(a=>a.RatesCountry).GetById(request.Id);
            _mapper.Map(request, targetAccountRate);
            await _dbContext.SaveChangesAsync(cancellationToken);
            targetAccountRate.RatesCountry  = _dbContext.RatesCountries.GetById(request.RatesCountryId);
            return _mapper.Map<CustomerAccountRateDTo>(targetAccountRate);
        }
    }
}