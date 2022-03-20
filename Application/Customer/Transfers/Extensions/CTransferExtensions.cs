using System;
using System.Collections.Generic;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Customer.Transfers.Extensions
{
    public static class CTransferExtensions
    {
        public static bool IsSender(this IQueryable<Transfer> query, Guid customerId, Guid transferId)
        {
            return query.Any(a => a.Id == transferId &&
                                  a.SenderId == customerId);
        }

        public static bool IsReceiver(this IQueryable<Transfer> query, Guid customerId, Guid transferId)
        {
            return query.Any(a => a.Id == transferId &&
                                  a.ReceiverId == customerId);
        }

        public static int LastCodeNumber(this IQueryable<Transfer> query, Guid customerId, Guid receiverId)
        {
            var lastTransfer = query.Where(a => a.SenderId == customerId && a.ReceiverId == receiverId)
                .OrderDescending().FirstOrDefault();
            if (lastTransfer.IsNull())
            {
                return -1;
            }

            return lastTransfer.CodeNumber;
        }

        public static bool IsForwarded(this IQueryable<Transfer> query, Guid transferId)
        {
            return query.Any(a => a.Id == transferId && a.Forwarded);
        }

        public static int GetForwardPriority(this IQueryable<Transfer> query, Guid baseForwardedId)
        {
            var latestForwarded = query.Where(a => a.ForwardedTransferId == baseForwardedId)
                .OrderByDescending(a => a.ForwardPriority).FirstOrDefault();
            return latestForwarded.IsNull() ? 1 : latestForwarded.ForwardPriority + 1;
        }

        public static bool IsLatestForwarded(this IQueryable<Transfer> query, Guid customerId, Guid transferId)
        {
            var targetTransfer = query.FirstOrDefault(a => a.Id == transferId);
            if (targetTransfer.ForwardedTransferId.IsNull())
            {
                return true;
            }

            return query.Any(a =>
                a.ForwardedTransferId == targetTransfer.ForwardedTransferId &&
                !a.Forwarded);
        }
        public static bool IsAForwardedOrForwarder(this IQueryable<Transfer> query, Guid customerId, Guid transferId)
        {
            var targetTransfer = query.FirstOrDefault(a => a.Id == transferId);
            if (targetTransfer.Forwarded || targetTransfer.ForwardedTransferId.IsNotNull())
            {
                return query.Where(a => a.Id == targetTransfer.ForwardedTransferId.ToGuid() ||
                                        a.ForwardedTransferId == targetTransfer.ForwardedTransferId.ToGuid())
                    .Any(a => a.SenderId == customerId || a.ReceiverId == customerId);

            }

            return false;
        }
        public static bool IsAForwardedOrForwarder(this IQueryable<Transfer> query, Guid customerId, Guid transferId,Guid exceptTransferId)
        {
            var targetTransfer = query.FirstOrDefault(a => a.Id == transferId);
            if (targetTransfer.Forwarded || targetTransfer.ForwardedTransferId.IsNotNull())
            {
                return query.Where(a => a.Id == targetTransfer.ForwardedTransferId.ToGuid() ||
                                        a.ForwardedTransferId == targetTransfer.ForwardedTransferId.ToGuid())
                    .Where(a=>a.Id!=exceptTransferId)
                    .Any(a => a.SenderId == customerId || a.ReceiverId == customerId);

            }

            return false;
        }

        public static IEnumerable<Transfer> GetForwards(this IQueryable<Transfer> query, Guid baseForwardedTransferId)
        {
            return query.Where(a => a.ForwardedTransferId == baseForwardedTransferId).ToList();
        }
    }
}