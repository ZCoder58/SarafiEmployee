using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Entities;

namespace Application.Customer.ExchangeRates.Extensions
{
    public static class ExchangeRateExtensions
    {
        public static CustomerExchangeRate GetExchangeRateById(this IQueryable<CustomerExchangeRate> query,Guid customerId, Guid fromCountryRateId, Guid toCountryRateId)
        {
            return query.FirstOrDefault(a =>
                a.CustomerId==customerId &&
                a.FromRatesCountryId == fromCountryRateId && 
                a.ToRatesCountryId == toCountryRateId);
        }
        public static CustomerExchangeRate GetExchangeRateReverseById(this IQueryable<CustomerExchangeRate> query,Guid customerId, Guid fromCountryRateId, Guid toCountryRateId)
        {
            return query.FirstOrDefault(a =>
                a.CustomerId==customerId &&
                a.Reverse &&
                a.ToRatesCountryId == fromCountryRateId && 
                a.FromRatesCountryId == toCountryRateId);
        }
        public static double ConvertCurrency(this IQueryable<CustomerExchangeRate> query,Guid customerId, Guid fromCountryRateId, Guid toCountryRateId,double amount)
        {
            var lastExchangeRate= query.OrderDescending()
                .FirstOrDefault(a =>
                a.CustomerId==customerId &&
                a.FromRatesCountryId == fromCountryRateId &&
                a.ToRatesCountryId == toCountryRateId);
            if (lastExchangeRate.IsNotNull())
            {
                return (amount / lastExchangeRate.FromAmount) * lastExchangeRate.ToExchangeRate;
            }

            return 0;
        }
    }
}