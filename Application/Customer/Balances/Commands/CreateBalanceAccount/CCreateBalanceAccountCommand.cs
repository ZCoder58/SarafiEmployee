using System;
using Domain.Entities;
using MediatR;

namespace Application.Customer.Balances.Commands.CreateBalanceAccount
{
    public class CCreateBalanceAccountCommand:IRequest<CustomerBalance>
    {
        public Guid RatesCountryId { get; set; }
        public Guid CustomerId { get; set; }
        public Guid? CustomerFriendId { get; set; }
    }
}