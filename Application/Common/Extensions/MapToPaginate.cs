using System.Linq;
using System.Threading.Tasks;
using Application.Common.Models;

namespace Application.Common.Extensions
{
    public static class MapToPaginate
    {
        public static Task<PaginatedList<T>> ToPaginatedListAsync<T>(this IQueryable<T> queryable, TableFilterModel model) =>
            PaginatedList<T>.CreateAsync(queryable,model);
    }
}