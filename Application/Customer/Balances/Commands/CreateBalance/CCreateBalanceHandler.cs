using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Balances.Commands.CreateRasid;
using Application.Customer.Balances.Commands.CreateTalab;
using Application.Customer.Balances.Statics;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Balances.Commands.CreateBalance
{
    public class CCreateBalanceHandler : IRequestHandler<CCreateBalanceCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;

        public CCreateBalanceHandler(IApplicationDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(CCreateBalanceCommand request, CancellationToken cancellationToken)
        {
            var targetFriend = _dbContext.Friends.GetById(request.FId);
            if (request.Type == BalanceTransactionTypes.Rasid)
            {
                await _mediator.Send(new CCreateRasidCommand(targetFriend.CustomerId,
                    targetFriend.CustomerFriendId.ToGuid(),
                    request.RatesCountryId, 
                    request.Amount,
                    request.Comment,
                    request.AddToAccount), cancellationToken);
            }

            if (request.Type == BalanceTransactionTypes.Talab)
            {
                await _mediator.Send(new CCreateTalabCommand(targetFriend.CustomerId,
                    targetFriend.CustomerFriendId.ToGuid(),
                    request.RatesCountryId,
                    request.Amount,
                    request.Comment,
                    true), cancellationToken);
            }

            return Unit.Value;
        }
    }
}