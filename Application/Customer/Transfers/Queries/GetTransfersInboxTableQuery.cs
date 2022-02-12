using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Models;
using Application.Common.Statics;
using Application.Customer.Transfers.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Transfers.Queries
{
    public record GetTransfersInboxTableQuery
        (TableFilterModel FilterModel) : IRequest<PaginatedList<TransferInboxTableDTo>>;

    public class
        GetTransfersTableInboxHandler : IRequestHandler<GetTransfersInboxTableQuery,
            PaginatedList<TransferInboxTableDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _userContext;

        public GetTransfersTableInboxHandler(IApplicationDbContext dbContext, IHttpUserContext userContext,
            IMapper mapper)
        {
            _dbContext = dbContext;
            _userContext = userContext;
            _mapper = mapper;
        }

        public async Task<PaginatedList<TransferInboxTableDTo>> Handle(GetTransfersInboxTableQuery request,
            CancellationToken cancellationToken)
        {
            var searchText = request.FilterModel.Search;
            var items = _dbContext.Transfers
                    .Where(a => 
                        a.ReceiverId == _userContext.GetCurrentUserId().ToGuid() &&
                        (a.State == TransfersStatusTypes.Completed ||
                         a.State == TransfersStatusTypes.InProgress))
                    .OrderDescending();
            if (searchText.IsNotNullOrEmpty())
            {
                items = items.Where(a =>
                    a.CodeNumber.ToString().Contains(searchText) ||
                    a.DestinationAmount.ToString().Contains(searchText) ||
                    a.FromCurrency.Contains(searchText) ||
                    a.FromName.Contains(searchText) ||
                    a.FromPhone.Contains(searchText) ||
                    a.SourceAmount.ToString().Contains(searchText) ||
                    a.ToCurrency.Contains(searchText) ||
                    a.ToName.Contains(searchText) ||
                    a.ToRate.ToString().Contains(searchText) ||
                    a.FromLastName.Contains(searchText) ||
                    a.ToLastName.Contains(searchText));
            }

            return await items
                .ProjectTo<TransferInboxTableDTo>(_mapper.ConfigurationProvider)
                .ToPaginatedListAsync(request.FilterModel);
        }
    }
}