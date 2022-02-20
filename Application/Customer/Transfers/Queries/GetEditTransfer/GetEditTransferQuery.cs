using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Friend.Extensions;
using Application.Customer.Transfers.DTOs;
using AutoMapper;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Transfers.Queries.GetEditTransfer
{
    public record GetEditTransferQuery(Guid Id) : IRequest<EditTransferDTo>;

    public class GetEditTransferQueryHandler : IRequestHandler<GetEditTransferQuery, EditTransferDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public GetEditTransferQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<EditTransferDTo> Handle(GetEditTransferQuery request, CancellationToken cancellationToken)
        {
            var targetTransfer = _dbContext.Transfers.GetById(request.Id);
            var editModel = _mapper.Map<EditTransferDTo>(targetTransfer);
            var fromCurrency = _dbContext.RatesCountries.FirstOrDefault(a=>a.PriceName==targetTransfer.FromCurrency);
            var toCurrency = _dbContext.RatesCountries.FirstOrDefault(a=>a.PriceName==targetTransfer.ToCurrency);
            var friend =
                _dbContext.Friends.GetFriendRequest(targetTransfer.SenderId, targetTransfer.ReceiverId.ToGuid());
            editModel.FriendId = friend.Id;
            editModel.FCurrency = fromCurrency.Id;
            editModel.TCurrency = toCurrency.Id;
            return await Task.FromResult(editModel);
        }
    }
}