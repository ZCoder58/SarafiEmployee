using System;
using System.Linq;
using Domain.Entities;

namespace Application.SunriseSuperAdmin.Rates.Extensions
{
    public static class RatesExtensions
    {
        public static bool IsSupportedRate(this IQueryable<RatesCountry> query,Guid rateId)
        {
            return query.Any(a => a.Id == rateId);
        }
        public static RatesCountry GetByAbbr(this IQueryable<RatesCountry> query,string abbr)
        {
            return query.FirstOrDefault(a => a.Abbr ==abbr);
        }
        public static RatesCountry GetByPriceName(this IQueryable<RatesCountry> query,string priceName)
        {
            return query.FirstOrDefault(a => a.PriceName ==priceName);
        }
    }
}