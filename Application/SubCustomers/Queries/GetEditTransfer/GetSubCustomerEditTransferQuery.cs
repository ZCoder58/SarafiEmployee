using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Friend.Extensions;
using Application.Customer.Transfers.DTOs;
using Application.SubCustomers.DTOs;
using AutoMapper;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Queries.GetEditTransfer
{
    public record GetSubCustomerEditTransferQuery(Guid Id) : IRequest<SubCustomerEditTransferDTo>;

    public class GetSubCustomerEditTransferQueryHandler : IRequestHandler<GetSubCustomerEditTransferQuery, SubCustomerEditTransferDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public GetSubCustomerEditTransferQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<SubCustomerEditTransferDTo> Handle(GetSubCustomerEditTransferQuery request, CancellationToken cancellationToken)
        {
            var targetTransfer = _dbContext.Transfers.GetById(request.Id);
            var editModel = _mapper.Map<SubCustomerEditTransferDTo>(targetTransfer);
            var toCurrency = _dbContext.RatesCountries.FirstOrDefault(a=>a.PriceName==targetTransfer.ToCurrency);
            var friend =
                _dbContext.Friends.GetFriendRequest(targetTransfer.SenderId, targetTransfer.ReceiverId.ToGuid());
            editModel.FriendId = friend.Id;
            editModel.TCurrency = toCurrency.Id;
            editModel.SubCustomerAccountRateId = _dbContext.SubCustomerAccountRates
                .Include(a=>a.RatesCountry)
                .FirstOrDefault(a => 
                    a.RatesCountry.PriceName == targetTransfer.FromCurrency &&
                    a.SubCustomerAccountId==targetTransfer.SubCustomerAccountId).Id;
            return await Task.FromResult(editModel);
        }
    }
}