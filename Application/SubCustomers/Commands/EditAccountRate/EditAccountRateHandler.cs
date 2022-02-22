using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.SubCustomers.DTOs;
using AutoMapper;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.EditAccountRate
{
    public class EditAccountRateHandler:IRequestHandler<EditAccountRateCommand,SubCustomerAccountRateDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        public EditAccountRateHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<SubCustomerAccountRateDTo> Handle(EditAccountRateCommand request, CancellationToken cancellationToken)
        {
            var targetAccountRate = _dbContext.SubCustomerAccountRates.Include(a=>a.RatesCountry).GetById(request.Id);
            _mapper.Map(request, targetAccountRate);
            await _dbContext.SaveChangesAsync(cancellationToken);
            targetAccountRate.RatesCountry  = _dbContext.RatesCountries.GetById(request.RatesCountryId);
            return _mapper.Map<SubCustomerAccountRateDTo>(targetAccountRate);
        }
    }
}