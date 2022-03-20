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

namespace Application.Customer.Transfers.Queries.GetForwardEditTransfer
{
    public record GetForwardEditTransferQuery(Guid Id) : IRequest<ForwardEditTransferDTo>;

    public class GetForwardEditTransferQueryHandler : IRequestHandler<GetForwardEditTransferQuery, ForwardEditTransferDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public GetForwardEditTransferQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<ForwardEditTransferDTo> Handle(GetForwardEditTransferQuery request, CancellationToken cancellationToken)
        {
            var targetTransfer = _dbContext.Transfers.GetById(request.Id);
            var editModel = _mapper.Map<ForwardEditTransferDTo>(targetTransfer);
            var fromCurrency = _dbContext.RatesCountries.FirstOrDefault(a=>a.PriceName==targetTransfer.FromCurrency);
            var friend =
                _dbContext.Friends.GetFriendRequest(targetTransfer.SenderId, targetTransfer.ReceiverId.ToGuid());
            editModel.FriendId = friend.Id;
            editModel.PriceName = fromCurrency.PriceName;
            return await Task.FromResult(editModel);
        }
    }
}