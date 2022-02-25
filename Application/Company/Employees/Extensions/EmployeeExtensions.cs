using System.Linq;
using Application.Common.Extensions;
using Application.Common.Statics;
using Domain.Interfaces;

namespace Application.Company.Employees.Extensions
{
    public static class EmployeeExtensions
    {
        public static IQueryable<T> GetEmployees<T>(this IQueryable<T> query,IHttpUserContext httpUserContext)where T :Domain.Entities.Customer
        {
            return query.Where(a => a.UserType == UserTypes.EmployeeType &&
                                    a.CompanyId == httpUserContext.GetCompanyId().ToGuid());
        }
    }
}