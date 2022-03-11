using System;
using System.Linq;
using Domain.Entities;

namespace Application.Customer.Transfers.Extensions
{
    public static class CTransferExtensions
    {
        public static bool IsExistsFor(this IQueryable<Transfer> query,Guid customerId, Guid transferId)
        {
            return query.Any(a => a.Id == transferId &&
                                  a.SenderId == customerId);
        }
       
    }
}