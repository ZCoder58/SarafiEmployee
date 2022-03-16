using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Balances.Commands.CreateBalanceAccount
{
    public class CCreateBalanceAccountHandler:IRequestHandler<CCreateBalanceAccountCommand,CustomerBalance>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        public CCreateBalanceAccountHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<CustomerBalance> Handle(CCreateBalanceAccountCommand request, CancellationToken cancellationToken)
        {
            var newBalanceAccount= await _dbContext.CustomerBalances.AddAsync(new CustomerBalance()
            {
                CustomerFriendId = request.CustomerFriendId.ToGuid(),
                 CustomerId= request.CustomerId,
                RatesCountryId = request.RatesCountryId,
                
            }, cancellationToken);
                var friendBalanceAccount = await _dbContext.CustomerBalances.AddAsync(new CustomerBalance()
            {
                CustomerId = request.CustomerFriendId.ToGuid(),
                CustomerFriendId = request.CustomerId,
                RatesCountryId = request.RatesCountryId
            }, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return newBalanceAccount.Entity;
        }
    }
}