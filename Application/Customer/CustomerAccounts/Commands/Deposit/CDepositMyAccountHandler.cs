using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Customer.CustomerAccounts.Commands.CreateAccountRate;
using Application.Customer.CustomerAccounts.Commands.Transactions.CreateTransaction;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit;
using Application.Customer.CustomerAccounts.Extensions;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.CustomerAccounts.Commands.Deposit
{
    public class CDepositMyAccountHandler : IRequestHandler<CDepositMyAccountCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;
        private readonly IHttpUserContext _httpUserContext;

        public CDepositMyAccountHandler(IApplicationDbContext dbContext, IMediator mediator, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(CDepositMyAccountCommand request, CancellationToken cancellationToken)
        {
            await _mediator.Send(new CDepositAccountCommand(true,
                request.RateCountryId,
                request.Amount,
                request.Comment,
                true),cancellationToken);
            return Unit.Value;
        }
    }
}