using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.SubCustomers.Commands.Transactions.CreateTransaction;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.UpdateAccountAmount.Deposit
{
    public class DepositSubCustomerAccountAmountHandler : IRequestHandler<DepositSubCustomerAccountAmountCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;

        public DepositSubCustomerAccountAmountHandler(IApplicationDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(DepositSubCustomerAccountAmountCommand request, CancellationToken cancellationToken)
        {
            var targetSubCustomerAccountRate = _dbContext.SubCustomerAccountRates
                .Include(a=>a.RatesCountry)
                .GetById(request.SubCustomerAccountRateId);
                //update account amount
                targetSubCustomerAccountRate.Amount += request.Amount;
                await _dbContext.SaveChangesAsync(cancellationToken);
                await _mediator.Send(new CreateTransactionCommand()
                {
                    Amount = request.Amount,
                    Comment = request.Comment,
                    PriceName = targetSubCustomerAccountRate.RatesCountry.PriceName,
                    TransactionType = TransactionTypes.Deposit,
                    SubCustomerAccountRateId = request.SubCustomerAccountRateId
                }, cancellationToken);
            return Unit.Value;
        }
    }
}