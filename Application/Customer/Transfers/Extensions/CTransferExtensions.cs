using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Transfers.Extensions
{
    public static class CTransferExtensions
    {
        public static bool IsExistsFor(this IQueryable<Transfer> query,Guid customerId, Guid transferId)
        {
            return query.Any(a => a.Id == transferId &&
                                  a.SenderId == customerId);
        }
        public static int LastCodeNumber(this IQueryable<Transfer> query,Guid customerId,Guid receiverId)
        {
            var lastTransfer=query.Where(a => a.SenderId == customerId && a.ReceiverId==receiverId)
                .OrderDescending().FirstOrDefault();
            if (lastTransfer.IsNull())
            {
                return -1;
            }
            return lastTransfer.CodeNumber;
        }
    }
}