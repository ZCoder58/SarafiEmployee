using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.Customer.CustomerAccounts.Commands.Transactions.CreateTransaction;
using Application.SubCustomers.Commands.Transactions.CreateTransaction;
using Application.SubCustomers.Commands.UpdateAccountAmount.Deposit;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Deposit
{
    public class DepositCustomerAccountAmountHandler : IRequestHandler<DepositCustomerAccountAmountCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;

        public DepositCustomerAccountAmountHandler(IApplicationDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(DepositCustomerAccountAmountCommand request, CancellationToken cancellationToken)
        {
            var targetCustomerAccount = _dbContext.CustomerAccounts
                .Include(a=>a.RatesCountry)
                .GetById(request.Id);
                //update account amount
                targetCustomerAccount.Amount += request.Amount;
                await _dbContext.SaveChangesAsync(cancellationToken);
                await _mediator.Send(new CreateCustomerTransactionCommand()
                {
                    Amount = request.Amount,
                    Comment = request.Comment,
                    PriceName = targetCustomerAccount.RatesCountry.PriceName,
                    TransactionType = TransactionTypes.Deposit,
                    CustomerAccountId = targetCustomerAccount.Id
                }, cancellationToken);
            return Unit.Value;
        }
    }
}