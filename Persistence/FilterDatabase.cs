using System;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace Persistence
{
    public static class FilterDatabase
    {
        public static void ApplyFilter<TInterface>(this ModelBuilder modelBuilder, Expression<Func<TInterface, bool>> filter)
        {
            var entities = modelBuilder.Model
           .GetEntityTypes()
           .Where(e => e.ClrType.GetInterface(typeof(TInterface).Name) != null)
           .Select(e => e.ClrType);
            foreach (var entity in entities)
            {
                var newParam = Expression.Parameter(entity);
                var newBody = ReplacingExpressionVisitor.Replace(filter.Parameters.Single(), newParam, filter.Body);
                modelBuilder.Entity(entity).HasQueryFilter(Expression.Lambda(newBody, newParam));
            }
        }
    }
}
