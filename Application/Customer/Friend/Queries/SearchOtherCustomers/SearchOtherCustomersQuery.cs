using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Statics;
using Application.Customer.Friend.DTOs;
using Application.Customer.Friend.Extensions;
using AutoMapper;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Friend.Queries.SearchOtherCustomers
{
    public record SearchOtherCustomersQuery(string Phone) : IRequest<IEnumerable<SearchOtherCustomerDTo>>;

    public class SearchOtherCustomersHandler:IRequestHandler<SearchOtherCustomersQuery,IEnumerable<SearchOtherCustomerDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpUserContext _httpUserContext;
        public SearchOtherCustomersHandler(IApplicationDbContext dbContext, IMapper mapper, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
        }

        public async Task<IEnumerable<SearchOtherCustomerDTo>> Handle(SearchOtherCustomersQuery request, CancellationToken cancellationToken)
        {
            var customers = new List<SearchOtherCustomerDTo>();
            foreach (var customer in _dbContext.Customers.Include(a=>a.Country)
                .Where(a => a.Phone.Contains(request.Phone) &&
                            a.Id!=_httpUserContext.GetCurrentUserId().ToGuid()).ToList())
            {
                var tempCustomer = _mapper.Map<SearchOtherCustomerDTo>(customer);
                var targetFriendRequest =
                    _dbContext.Friends.GetFriendRequest(_httpUserContext.GetCurrentUserId().ToGuid(),customer.Id);
                if (targetFriendRequest.IsNotNull())
                {
                    tempCustomer.RequestState =targetFriendRequest.State;
                    tempCustomer.RequestId = targetFriendRequest.Id;
                    customers.Add(tempCustomer);
                }
                else
                {
                    tempCustomer.RequestState = FriendRequestStates.NotSend;
                    customers.Add(tempCustomer);
                }
            }
            return await Task.FromResult(customers.ToList());
        }
    }
}