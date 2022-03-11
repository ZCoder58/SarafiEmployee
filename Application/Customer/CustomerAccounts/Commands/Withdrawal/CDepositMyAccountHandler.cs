using System.Threading;
using System.Threading.Tasks;
using Application.Customer.CustomerAccounts.Commands.Deposit;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Withdrawal;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.Withdrawal
{
    public class CWithdrawalMyAccountHandler : IRequestHandler<CWithdrawalMyAccountCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;
        private readonly IHttpUserContext _httpUserContext;

        public CWithdrawalMyAccountHandler(IApplicationDbContext dbContext, IMediator mediator, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(CWithdrawalMyAccountCommand request, CancellationToken cancellationToken)
        {
            await _mediator.Send(new CWithdrawalAccountCommand(true,
                request.RateCountryId,
                request.Amount,
                request.Comment,
                true),cancellationToken);
            return Unit.Value;
        }
    }
}