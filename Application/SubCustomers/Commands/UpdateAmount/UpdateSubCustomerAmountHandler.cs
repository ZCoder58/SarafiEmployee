using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.ExchangeRates.Extensions;
using Application.SubCustomers.Statics;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.UpdateAmount
{
    public class UpdateSubCustomerAmountHandler : IRequestHandler<UpdateSubCustomerAmountCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;

        public UpdateSubCustomerAmountHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(UpdateSubCustomerAmountCommand request, CancellationToken cancellationToken)
        {
            var targetSubCustomerAccountRate = _dbContext.SubCustomerAccountRates
                .Include(a=>a.RatesCountry)
                .GetById(request.SubCustomerAccountRateId);

            if (request.Type == SubCustomerTransactionTypes.Withdrawal)
            {
                targetSubCustomerAccountRate.Amount = targetSubCustomerAccountRate.Amount - request.Amount;
            }
            else
            {
                targetSubCustomerAccountRate.Amount = targetSubCustomerAccountRate.Amount + request.Amount;
            }
            await _dbContext.SubCustomerTransactions.AddAsync(new SubCustomerTransaction()
            {
                SubCustomerAccountRateId = request.SubCustomerAccountRateId,
                Amount = request.Amount,
                Comment = request.Comment,
                PriceName = targetSubCustomerAccountRate.RatesCountry.PriceName,
                TransactionType = request.Type,
                TransferId = request.TransferId
            }, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}