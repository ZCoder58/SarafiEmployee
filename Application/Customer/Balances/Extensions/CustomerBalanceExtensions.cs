using System;
using System.Linq;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Balances.Extensions
{
    public static class CustomerBalanceExtensions
    {
        public static bool HaveTalab(this IQueryable<CustomerBalance> query,Guid customerId,Guid customerFriendId, double amount)
        {
            return query.Any(a => a.CustomerId == customerId && 
                                  a.CustomerFriendId==customerFriendId &&
                                  a.Amount>0 &&
                                  a.Amount<=amount);
        }   
        public static CustomerBalance GetReverseBalance(this IQueryable<CustomerBalance> query,Guid customerId,Guid customerFriendId,Guid rateCountryId)
        {
            return query.FirstOrDefault(a => a.CustomerId == customerFriendId &&
                                             a.RatesCountryId ==rateCountryId &&
                                             a.CustomerFriendId==customerId);
        }   
        public static CustomerBalance GetByRateCountryId(this IQueryable<CustomerBalance> query,Guid customerId,Guid customerFriendId,Guid rateCountryId)
        {
            return query.FirstOrDefault(a => a.CustomerId == customerId &&
                                             a.CustomerFriendId==customerFriendId &&
                                             a.RatesCountryId ==rateCountryId);
        } 
    }
}