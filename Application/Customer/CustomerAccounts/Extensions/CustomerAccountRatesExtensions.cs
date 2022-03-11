using System;
using System.Linq;
using Application.Common.Extensions;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.CustomerAccounts.Extensions
{
    public static class CustomerAccountRatesExtensions
    {
        public static CustomerAccount GetByCountryRateId(this IQueryable<CustomerAccount> query,Guid rateCountryId,Guid customerId)
        {
            return query.FirstOrDefault(a => a.RatesCountryId == rateCountryId&& a.CustomerId==customerId);
        }
        public static bool IsExists(this IQueryable<CustomerAccount> query,Guid customerAccountRateId,Guid customerId)
        {
            return query.Any(a => a.Id == customerAccountRateId && a.CustomerId==customerId);
        }
        public static bool IsExistsSameRate(this IQueryable<CustomerAccount> query,Guid customerAccountRateId,Guid customerId,Guid rateCountryId)
        {
            return !query.Any(a => a.Id != customerAccountRateId &&
                                  a.CustomerId==customerId &&
                                  a.RatesCountryId==rateCountryId);
        }
        public static bool HasEnoughAmount(this IQueryable<CustomerAccount> query,Guid rateCountryId,Guid customerId,double amount)
        {
            return query.Any(a => a.RatesCountryId == rateCountryId && a.CustomerId==customerId && a.Amount>=amount);
        }
        public static CustomerAccountTransaction GetByTransferId(this IQueryable<CustomerAccountTransaction> query,Guid transferId,Guid customerId)
        {
            return query.Include(a=>a.CustomerAccount)
                .FirstOrDefault(a => a.TransferId == transferId&& a.CustomerAccount.CustomerId== customerId);
        }
        public static bool IsExistsByCountryRateId(this IQueryable<CustomerAccount> query,Guid customerId,Guid rateCountryId)
        {
            return query.Any(a => a.RatesCountryId == rateCountryId &&
                                  a.CustomerId==customerId);
        }
        public static bool IsExistsByCountryRateId(this IQueryable<CustomerAccount> query,Guid customerId,Guid rateCountryId,out CustomerAccount targetCustomerAccount)
        {
            targetCustomerAccount= query.Where(a=>a.CustomerId==customerId).FirstOrDefault(a => a.RatesCountryId == rateCountryId);
            return targetCustomerAccount.IsNotNull();
        }
    }
}