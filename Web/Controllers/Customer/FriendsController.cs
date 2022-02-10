using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.Customer.Friend.Commands.ApproveFriendRequest;
using Application.Customer.Friend.Commands.CancelFriendRequest;
using Application.Customer.Friend.Commands.DeleteFriendRequest;
using Application.Customer.Friend.Commands.DenyFriendRequest;
using Application.Customer.Friend.Commands.SendFriendRequest;
using Application.Customer.Friend.DTOs;
using Application.Customer.Friend.Queries;
using Application.Customer.Friend.Queries.GetFriendsList;
using Application.Customer.Friend.Queries.GetFriendsListTable;
using Application.Customer.Friend.Queries.GetFriendsRequestsList;
using Application.Customer.Friend.Queries.SearchOtherCustomers;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.Customer
{
    [Route("api/customer/friends")]
    public class FriendsController : ApiBaseController
    {
        [HttpGet]
        public Task<PaginatedList<FriendsListDTo>> GetFriendsListTable(int page,string search)
        {
            return Mediator.Send(new GetFriendsListTableQuery(new TableFilterModel()
            {
                Page = page,
                PerPage = 20,
                Search = search
            }));
        }
        [HttpGet("list")]
        public Task<IEnumerable<FriendsListDTo>> GetFriendsList()
        {
            return Mediator.Send(new GetFriendsListQuery());
        }
        [HttpGet("requests/count")]
        public Task<int> GetFriendsRequestCount()
        {
            return Mediator.Send(new GetFriendRequestCountQuery());
        }
        [HttpGet("search")]
        public Task<IEnumerable<SearchOtherCustomerDTo>> SearchCustomer(string phone)
        {
            return Mediator.Send(new SearchOtherCustomersQuery(phone));
        }
        [HttpGet("approveRequest/{id}")]
        public Task<RequestDto> ApproveRequest(Guid id)
        {
            return Mediator.Send(new ApproveFriendRequestCommand(id));
        }
        [HttpGet("sendRequest/{id}")]
        public Task<RequestDto> SendRequest(Guid id)
        {
            return Mediator.Send(new SendFriendRequestCommand(id));
        }
        [HttpGet("deleteRequest/{id}")]
        public Task<RequestDto> DeleteRequest(Guid id)
        {
            return Mediator.Send(new DeleteFriendRequestCommand(id));
        }
        [HttpGet("cancelRequest/{id}")]
        public Task<RequestDto> CancelRequest(Guid id)
        {
            return Mediator.Send(new CancelFriendRequestCommand(id));
        }
        [HttpGet("denyRequest/{id}")]
        public Task DenyRequest(Guid id)
        {
            return Mediator.Send(new DenyFriendRequestCommand(id));
        }
        [HttpGet("requests")]
        public Task<PaginatedList<FriendRequestDTo>> GetFriendsRequests(int page)
        {
            return Mediator.Send(new GetFriendsRequestsListQuery(new TableFilterModel()
            {
                Page = page,
                PerPage = 20
            }));
        }
        
        [HttpGet("searchFriend")]
        public Task<IEnumerable<SearchFriendDTo>> SearchFriend(string search)
        {
            return Mediator.Send(new SearchFriendQuery(search));
        }
    }
}