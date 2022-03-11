using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.SubCustomers.Commands.Transactions.CreateTransaction;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.UpdateAccountAmount.WithdrawalTransfer
{
    public class CsWithdrawalAccountTransferHandler : IRequestHandler<CsWithdrawalAccountTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;

        public CsWithdrawalAccountTransferHandler(IApplicationDbContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(CsWithdrawalAccountTransferCommand request,
            CancellationToken cancellationToken)
        {
            var targetSubCustomerAccountRate = _dbContext.SubCustomerAccountRates
                .Include(a => a.RatesCountry)
                .GetById(request.SubCustomerAccountRateId);
            var transactionType = targetSubCustomerAccountRate.Amount >= request.Amount
                ? TransactionTypes.Transfer
                : TransactionTypes.TransferWithDebt;
            //update account amount
            targetSubCustomerAccountRate.Amount -= request.Amount;
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Send(new CsCreateTransactionCommand()
            {
                Amount = request.Amount,
                Comment = request.Comment,
                PriceName = targetSubCustomerAccountRate.RatesCountry.PriceName,
                TransactionType = transactionType,
                SubCustomerAccountRateId = request.SubCustomerAccountRateId,
                TransferId = request.TransferId
            }, cancellationToken);
            return Unit.Value;
        }
    }
}