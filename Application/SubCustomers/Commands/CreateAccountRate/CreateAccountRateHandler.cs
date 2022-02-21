using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.SubCustomers.Commands.CreateAccountRate
{
    public class CreateAccountRateHandler:IRequestHandler<CreateAccountRateCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;

        public CreateAccountRateHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(CreateAccountRateCommand request, CancellationToken cancellationToken)
        {
           await _dbContext.SubCustomerAccountRates.AddAsync(_mapper.Map<SubCustomerAccountRate>(request),cancellationToken);
           await _dbContext.SaveChangesAsync(cancellationToken);
           return Unit.Value;
        }
    }
}