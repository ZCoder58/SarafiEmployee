using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Balances.Commands.CreateBalanceTransaction
{
    public class CCreateBalanceTransactionHandler:IRequestHandler<CCreateBalanceTransactionCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        public CCreateBalanceTransactionHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(CCreateBalanceTransactionCommand request, CancellationToken cancellationToken)
        {
            await _dbContext.CustomerBalanceTransactions.AddAsync(_mapper.Map<CustomerBalanceTransaction>(request),
                cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}