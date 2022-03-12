using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit;
using Application.SubCustomers.Commands.Transactions.CreateTransaction;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.UpdateAccountAmount.Deposit
{
    public class CsDepositAccountHandler : IRequestHandler<CsDepositAccountCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;
        private readonly IHttpUserContext _httpUserContext;

        public CsDepositAccountHandler(IApplicationDbContext dbContext, IMediator mediator, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(CsDepositAccountCommand request, CancellationToken cancellationToken)
        {
            var targetSubCustomerAccountRate = _dbContext.SubCustomerAccountRates
                .Include(a=>a.RatesCountry)
                .GetById(request.SubCustomerAccountRateId);
                //update account amount
                targetSubCustomerAccountRate.Amount += request.Amount;
                await _dbContext.SaveChangesAsync(cancellationToken);
                await _mediator.Send(new CsCreateTransactionCommand()
                {
                    Amount = request.Amount,
                    Comment = request.Comment,
                    PriceName = targetSubCustomerAccountRate.RatesCountry.PriceName,
                    TransactionType = TransactionTypes.Deposit,
                    SubCustomerAccountRateId = request.SubCustomerAccountRateId,
                    AccountTransaction = request.AddToAccount
                }, cancellationToken);
                
                if (request.AddToAccount)
                {
                    await _mediator.Send(new CDepositAccountCommand(
                        true,
                        targetSubCustomerAccountRate.RatesCountryId,
                        request.Amount,
                        "",
                        false
                    ), cancellationToken);
                }
            return Unit.Value;
        }
    }
}