using System;
using System.Linq;
using Application.Common.Extensions;
using Domain.Entities;

namespace Application.SubCustomers.Extensions
{
    public static class ScAccountExtensions
    {
        public static bool IsExists(this IQueryable<SubCustomerAccountRate> query, Guid rateCountryId,Guid subCustomerAccountId)
        {
            return query.Any(a => a.RatesCountryId == rateCountryId &&
                                  a.SubCustomerAccountId==subCustomerAccountId);
        }
        public static bool IsExists(this IQueryable<SubCustomerAccountRate> query, Guid rateCountryId,Guid subCustomerAccountId,out SubCustomerAccountRate targetSubCustomerAccountRate)
        {
            targetSubCustomerAccountRate= query.FirstOrDefault(a => a.RatesCountryId == rateCountryId &&
                                  a.SubCustomerAccountId==subCustomerAccountId);
            return targetSubCustomerAccountRate.IsNotNull();
        }
    }
}