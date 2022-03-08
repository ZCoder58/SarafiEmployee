using System;
using System.Linq;
using Domain.Entities;

namespace Application.Company.Agencies.Extensions
{
    public static class AgencyExtensions
    {
        public static bool IsExistByName(this IQueryable<CompanyAgency> query,string agencyName, Guid forCompanyId)
        {
            return query.Any(a => a.CompanyInfoId == forCompanyId &&
                                  a.Name == agencyName);
        }
        public static bool IsExistByName(this IQueryable<CompanyAgency> query,string agencyName, Guid forCompanyId,Guid exceptId)
        {
            return query.Any(a => a.CompanyInfoId == forCompanyId &&
                                  a.Name == agencyName &&
                                  a.Id!=exceptId);
        }
        public static bool IsExistById(this IQueryable<CompanyAgency> query,Guid id, Guid forCompanyId)
        {
            return query.Any(a => a.CompanyInfoId == forCompanyId &&
                                  a.Id == id);
        }
        
    }
}