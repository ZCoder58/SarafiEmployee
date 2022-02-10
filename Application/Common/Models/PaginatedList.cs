using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Models
{
    public class PaginatedList<T>
    {
        public List<T> Items { get; }
        public int TotalCount { get; }
        public bool HasNext { get; set; }
        public bool HasPrevious { get; set; }

        public PaginatedList(List<T> items, int count,bool hasNext,bool hasPrevious)
        {
            TotalCount = count;
            Items = items;
            HasPrevious = hasPrevious;
            HasNext = hasNext;
        }

        public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, TableFilterModel filterModel)
        {
            filterModel.Page = (filterModel.Page < 0 ? 0 : filterModel.Page);
            filterModel.PerPage = (filterModel.PerPage < 0 ? 0 : filterModel.PerPage);
            var count = await source.CountAsync();
            
            var items= await source.Skip((filterModel.Page - 1) * filterModel.PerPage).Take(filterModel.PerPage)
                    .ToListAsync();
            if (filterModel.Column.IsNotNull())
            {
                string capitalizedFirstLetterPropertyName =
                    filterModel.Column.ElementAt(0).ToString().ToUpper() +
                    filterModel.Column.Remove(0, 1);
                var propName = typeof(T).GetProperty(capitalizedFirstLetterPropertyName);
                if (filterModel.Direction == "asc")
                {
                    items = items.OrderBy(a => propName?.GetValue(a, null)).ToList();
                }
                else if (filterModel.Direction == "desc")
                {
                    items = items.OrderByDescending(a => propName?.GetValue(a, null)).ToList();
                }
            }

            var hasPrevious = filterModel.Page > 1;
            var hasNext = (count / filterModel.PerPage) >filterModel.Page ;
            return new PaginatedList<T>(items, count,hasNext,hasPrevious);
        }
    }
}