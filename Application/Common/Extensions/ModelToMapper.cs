using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Extensions
{
    public static class ModelToMapper
    {
        public static Task<List<T>> MapperTo<T>(this IQueryable<T> queryable,
            IConfigurationProvider configurationProvider) =>
            queryable.ProjectTo<T>(configurationProvider).ToListAsync();
    }
}