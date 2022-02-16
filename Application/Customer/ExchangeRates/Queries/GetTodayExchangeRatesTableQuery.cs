using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.ExchangeRates.DTos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.ExchangeRates.Queries
{
    public record GetTodayExchangeRatesTableQuery
        (DateTime TargetDate) : IRequest<IEnumerable<CustomerExchangeRatesListDTo>>;

    public class GetTodayExchangeRatesTableHandler : IRequestHandler<GetTodayExchangeRatesTableQuery,
        IEnumerable<CustomerExchangeRatesListDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMediator _mediator;

        public GetTodayExchangeRatesTableHandler(IApplicationDbContext dbContext, IMapper mapper,
            IHttpUserContext httpUserContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
            _mediator = mediator;
        }
        

        public async Task<IEnumerable<CustomerExchangeRatesListDTo>> Handle(GetTodayExchangeRatesTableQuery request, CancellationToken cancellationToken)
        {
            return await _dbContext.CustomerExchangeRates
                .Where(a => a.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                            !a.Reverse &&
                            a.FromRatesCountryId !=(Guid)a.ToRatesCountryId &&
                            (a.UpdatedDate.Value.Date == request.TargetDate.Date ||
                             a.CreatedDate.Value.Date == request.TargetDate.Date))
                .OrderDescending()
                .ProjectTo<CustomerExchangeRatesListDTo>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}