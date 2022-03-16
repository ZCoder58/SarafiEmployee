using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Balances.Commands.CreateBalanceAccount;
using Application.Customer.Balances.Commands.CreateBalanceTransaction;
using Application.Customer.Balances.Extensions;
using Application.Customer.Balances.Statics;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Balances.Commands.CreateRasid
{
    public class CCreateRasidHandler : IRequestHandler<CCreateRasidCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;

        public CCreateRasidHandler(IApplicationDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(CCreateRasidCommand request, CancellationToken cancellationToken)
        {
            var targetAccountBalance = _dbContext.CustomerBalances.Include(a=>a.RatesCountry).GetByRateCountryId(request.CustomerId,
                request.CustomerFriendId, request.RateCountryId);
            
            if (targetAccountBalance.IsNull())
            {
                targetAccountBalance = await _mediator.Send(new CCreateBalanceAccountCommand()
                {
                    CustomerId = request.CustomerId,
                    CustomerFriendId = request.CustomerFriendId,
                    RatesCountryId = request.RateCountryId
                }, cancellationToken);
            }

            var targetAccountRate = _dbContext.RatesCountries.GetById(request.RateCountryId);
            var friendAccountBalance = _dbContext.CustomerBalances.GetReverseBalance(targetAccountBalance.CustomerId,
                targetAccountBalance.CustomerFriendId.ToGuid(), targetAccountBalance.RatesCountryId);
            targetAccountBalance.Amount -= request.Amount;
            _dbContext.CustomerBalances.Update(targetAccountBalance);
            friendAccountBalance.Amount += request.Amount;
            await _dbContext.SaveChangesAsync(cancellationToken);
            if (request.AddToAccount)
            {
                await _mediator.Send(new CDepositAccountCommand(true,
                    targetAccountBalance.RatesCountryId,
                    request.Amount,
                    "",
                    false),cancellationToken);
            }
            await _mediator.Send(new CCreateBalanceTransactionCommand(targetAccountBalance.Id,
                BalanceTransactionTypes.Rasid,
                request.Amount,
                request.Comment,
                targetAccountRate.PriceName
                ),cancellationToken);
            
            return Unit.Value;
        }
    }
}