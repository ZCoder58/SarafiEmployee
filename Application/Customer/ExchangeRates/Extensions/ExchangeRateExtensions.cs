using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.ExchangeRates.Extensions
{
    public static class ExchangeRateExtensions
    {
        public static CustomerExchangeRate GetExchangeRateById(this IQueryable<CustomerExchangeRate> query,
            Guid customerId, Guid fromCountryRateId, Guid toCountryRateId)
        {
            return query.OrderAscending().FirstOrDefault(a =>
                a.CustomerId == customerId &&
                (a.FromRatesCountryId == fromCountryRateId &&
                 a.ToRatesCountryId == toCountryRateId) ||
                (a.FromRatesCountryId == toCountryRateId &&
                 a.ToRatesCountryId == fromCountryRateId));
        }
        public static CustomerExchangeRate GetTodayExchangeRateById(this IQueryable<CustomerExchangeRate> query,
            Guid customerId, Guid fromCountryRateId, Guid toCountryRateId)
        {
            return query.OrderAscending().FirstOrDefault(a =>
                a.CustomerId == customerId &&
                a.CreatedDate.Value.Date==CDateTime.Now.Date &&
                (a.FromRatesCountryId == fromCountryRateId &&
                 a.ToRatesCountryId == toCountryRateId) ||
                (a.FromRatesCountryId == toCountryRateId &&
                 a.ToRatesCountryId == fromCountryRateId));
        }

        // public static CustomerExchangeRate GetExchangeRateReverseById(this IQueryable<CustomerExchangeRate> query,Guid customerId, Guid fromCountryRateId, Guid toCountryRateId)
        // {
        //     return query.FirstOrDefault(a =>
        //         a.CustomerId==customerId &&
        //         a.Reverse &&
        //         a.ToRatesCountryId == fromCountryRateId && 
        //         a.FromRatesCountryId == toCountryRateId);
        // }
        public static double ConvertCurrencyById(this IQueryable<CustomerExchangeRate> query,
            Guid customerId, Guid fromCountryRateId, Guid toCountryRateId, double amount, string type)
        {
            var lastExchangeRate = query.OrderDescending()
                .FirstOrDefault(a =>
                    a.CustomerId == customerId &&
                    (a.FromRatesCountryId == fromCountryRateId &&
                     a.ToRatesCountryId == toCountryRateId) ||
                    (a.FromRatesCountryId == toCountryRateId &&
                     a.ToRatesCountryId == fromCountryRateId));

            if (lastExchangeRate.IsNotNull())
            {
                var exchangeRate =
                    (type == "buy" ? lastExchangeRate.ToExchangeRateBuy : lastExchangeRate.ToExchangeRateSell);
                if (lastExchangeRate.FromRatesCountryId == fromCountryRateId)
                {
                    return (lastExchangeRate.FromAmount == 1
                        ? amount * exchangeRate
                        : (amount /
                           lastExchangeRate.FromAmount) * exchangeRate);
                }

                return (exchangeRate == 1
                    ? amount * lastExchangeRate.FromAmount
                    : (amount / exchangeRate) * lastExchangeRate.FromAmount);
            }

            return 0;
        }

        public static double ConvertCurrencyByAbbr(this IQueryable<CustomerExchangeRate> query, Guid customerId,
            string fromCountryRateAbbr, string toCountryRateAbbr, double amount, string type)
        {
            var lastExchangeRate = query.OrderDescending()
                .Include(a => a.FromRatesCountry)
                .Include(a => a.ToRatesCountry)
                .FirstOrDefault(a =>
                    a.CustomerId == customerId &&
                    (a.FromRatesCountry.Abbr == fromCountryRateAbbr &&
                     a.ToRatesCountry.Abbr == toCountryRateAbbr) ||
                    (a.FromRatesCountry.Abbr == toCountryRateAbbr &&
                     a.ToRatesCountry.Abbr == fromCountryRateAbbr));

            if (lastExchangeRate.IsNotNull())
            {
                var exchangeRate =
                    (type == "buy" ? lastExchangeRate.ToExchangeRateBuy : lastExchangeRate.ToExchangeRateSell);
                if (lastExchangeRate.FromRatesCountry.Abbr == fromCountryRateAbbr)
                {
                    return lastExchangeRate.FromAmount == 1
                        ? amount * exchangeRate
                        : (amount /
                           lastExchangeRate.FromAmount) * exchangeRate;
                }

                return exchangeRate == 1
                    ? amount * lastExchangeRate.FromAmount
                    : (amount / exchangeRate) * lastExchangeRate.FromAmount;
            }

            return 0;
        }
    }
}