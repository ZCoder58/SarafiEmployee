using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.Customer.CustomerAccounts.Commands.Transactions.CreateTransaction;
using Application.SubCustomers.Commands.Transactions.CreateTransaction;
using Application.SubCustomers.Commands.UpdateAccountAmount.Withdrawal;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.Withdrawal
{
    public class WithdrawalCustomerAccountAmountHandler : IRequestHandler<WithdrawalCustomerAccountAmountCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;

        public WithdrawalCustomerAccountAmountHandler(IApplicationDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(WithdrawalCustomerAccountAmountCommand request,
            CancellationToken cancellationToken)
        {
            var myAccount = _dbContext.CustomerAccounts
                .Include(a => a.RatesCountry)
                .GetById(request.CustomerAccountId);
            var transactionType =  TransactionTypes.Withdrawal;
            //update account amount
            myAccount.Amount -= request.Amount;
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Send(new CreateCustomerTransactionCommand()
            {
                Amount = request.Amount,
                Comment = request.Comment,
                PriceName = myAccount.RatesCountry.PriceName,
                TransactionType = transactionType,
                CustomerAccountId = request.CustomerAccountId
            }, cancellationToken);
            return Unit.Value;
        }
    }
}