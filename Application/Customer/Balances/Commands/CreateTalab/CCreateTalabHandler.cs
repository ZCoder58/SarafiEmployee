using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Balances.Commands.CreateBalanceAccount;
using Application.Customer.Balances.Commands.CreateBalanceTransaction;
using Application.Customer.Balances.Commands.CreateTalab;
using Application.Customer.Balances.Extensions;
using Application.Customer.Balances.Statics;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Balances.Commands.CreateTalab
{
    public class CCreateTalabHandler : IRequestHandler<CCreateTalabCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;

        public CCreateTalabHandler(IApplicationDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(CCreateTalabCommand request, CancellationToken cancellationToken)
        {
            var targetAccountBalance = _dbContext.CustomerBalances.GetByRateCountryId(request.CustomerId,
                request.CustomerFriendId,
                request.RateCountryId);
            if (targetAccountBalance.IsNull())
            {
                targetAccountBalance = await _mediator.Send(new CCreateBalanceAccountCommand()
                {
                    CustomerId = request.CustomerId,
                    CustomerFriendId = request.CustomerFriendId,
                    RatesCountryId = request.RateCountryId
                }, cancellationToken);
            }

            var friendAccountBalance = _dbContext.CustomerBalances.GetReverseBalance(targetAccountBalance.CustomerId,
                targetAccountBalance.CustomerFriendId.ToGuid(), targetAccountBalance.RatesCountryId);
            targetAccountBalance.Amount += request.Amount;
            friendAccountBalance.Amount -= request.Amount;
            _dbContext.CustomerBalances.Update(targetAccountBalance);
            var targetAccountRate = _dbContext.RatesCountries.GetById(request.RateCountryId);
            await _dbContext.SaveChangesAsync(cancellationToken);
            if (request.EnableTransaction)
            {
                await _mediator.Send(new CCreateBalanceTransactionCommand(targetAccountBalance.Id,
                    BalanceTransactionTypes.Talab,
                    request.Amount,
                    request.Comment,
                    targetAccountRate.PriceName,
                    request.TransferId), cancellationToken);
            }
            return Unit.Value;
        }
    }
}