using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Common;
using Domain.Interfaces;

namespace Application.Common.Extensions.DbContext
{
    public static class DbModelsExtensions
    {

        /// <summary>
        /// find out if an entity exists
        /// </summary>
        /// <param name="id"></param>
        /// <returns>true is exist else false</returns>
        public static bool IsExists<T>(this IQueryable<T> model ,Guid id) where T :BaseEntity
        {
            return model.Any(a => a.Id == id);
        } 
        /// <summary>
        /// find out if an entity exists
        /// </summary>
        /// <param name="id"></param>
        /// <returns>true is exist else false and out target findded entity</returns>
        public static bool IsExists<T>(this IQueryable<T> model ,Guid id,out T targetModel) where T :BaseEntity
        {
             targetModel = model.FirstOrDefault(a => a.Id == id);
            return targetModel.IsNotNull();
        }
        /// <summary>
        /// find out an entity by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>target entity</returns>
        public static T GetById<T>(this IQueryable<T> model ,Guid id) where T :BaseEntity
        {
             return model.FirstOrDefault(a => a.Id == id);
        }
        /// <summary>
        /// order by ascending list of entities by created date
        /// </summary>
        /// <returns>IQueryable of entities</returns>
        public static IQueryable<T> OrderAscending<T>(this IQueryable<T> model) where T :BaseEntity
        {
            return model.OrderBy(a => a.CreatedDate);
        }
        /// <summary>
        /// order by descending list of entities by created date
        /// </summary>
        /// <returns>IQueryable of entities</returns>
        public static IQueryable<T> OrderDescending<T>(this IQueryable<T> model) where T :BaseEntity
        {
            return model.OrderByDescending(a => a.CreatedDate);
        }
        public static T GetUser<T>(this IQueryable<T> query,string useName,string password) where T :IAuthUser
        {
            return query.FirstOrDefault(a => a.UserName==useName && a.Password == password);
        }
        public static IQueryable<T> GetUnSeenList<T>(this IQueryable<T> model) where T :ISeenNotification
        {
            return model.Where(a => !a.IsSeen);
        }
        public static IQueryable<T> GetSeenList<T>(this IQueryable<T> model) where T :ISeenNotification
        {
            return model.Where(a => a.IsSeen);
        }
        public static IQueryable<T> GetReadList<T>(this IQueryable<T> model) where T :IReadNotification
        {
            return model.Where(a => a.IsRead);
        }
        public static IQueryable<T> GetUnReadList<T>(this IQueryable<T> model) where T :IReadNotification
        {
            return model.Where(a => !a.IsRead);
        }
        public static bool IsUniqueUserName<T>(this IQueryable<T> model,string userName) where T :IAuthUser
        {
            return !model.Any(a => a.UserName==userName);
        }
        public static bool IsUniqueEmail<T>(this IQueryable<T> model,string email) where T :IAuthUser
        {
            return !model.Any(a => a.Email==email);
        }
        public static bool IsUniqueUserNameExcept<T>(this IQueryable<T> model,string userName,Guid userId) where T :IAuthUser
        {
            return !model.Any(a => a.UserName==userName && a.Id!=userId);
        }
        public static bool IsValidUserPassword<T>(this IQueryable<T> model,string password,Guid userId) where T :IAuthUser
        {
            return model.Any(a => a.Password==password && a.Id==userId);
        }
        public static bool IsPremiumAccount<T>(this IQueryable<T> model,Guid customerId) where T :Domain.Entities.Customer
        {
            return model.Any(a => a.Id==customerId && a.IsPremiumAccount);
        }

    }
}