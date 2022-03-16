using System.Threading;
using System.Threading.Tasks;
using Application.Customer.Balances.Extensions;
using Application.Customer.Balances.Statics;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Balances.Commands.RollbackAmount
{
    public class RollbackBalanceAmountHandler:IRequestHandler<RollbackBalanceAmountCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        

        public RollbackBalanceAmountHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(RollbackBalanceAmountCommand request, CancellationToken cancellationToken)
        {
            var targetAccountBalance = _dbContext.CustomerBalances.GetByRateCountryId(request.CustomerId,
                request.CustomerFriendId, request.RatesCountryId);
            var targetReverseBalance = _dbContext.CustomerBalances.GetReverseBalance(request.CustomerId,
                request.CustomerFriendId, request.RatesCountryId);
            if (request.Type == BalanceTransactionTypes.Rasid)
            {
                targetAccountBalance.Amount += request.Amount;
                targetReverseBalance.Amount -= request.Amount;
            }
            if (request.Type == BalanceTransactionTypes.Talab)
            {
                targetAccountBalance.Amount -= request.Amount;
                targetReverseBalance.Amount += request.Amount;
            }
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}