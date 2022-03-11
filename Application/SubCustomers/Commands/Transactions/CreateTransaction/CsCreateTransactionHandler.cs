using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.SubCustomers.Commands.Transactions.CreateTransaction
{
    public class CsCreateTransactionHandler:IRequestHandler<CsCreateTransactionCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public CsCreateTransactionHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(CsCreateTransactionCommand request, CancellationToken cancellationToken)
        {
            await _dbContext.SubCustomerTransactions.AddAsync(_mapper.Map<SubCustomerTransaction>(request), cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}