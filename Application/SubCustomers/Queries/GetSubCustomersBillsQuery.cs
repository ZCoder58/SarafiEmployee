using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.SubCustomers.DTOs;
using Application.SubCustomers.Statics;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
namespace Application.SubCustomers.Queries
{
    public record GetSubCustomersBillsQuery
        (DateTime FromDate, DateTime ToDate, Guid SubCustomerId) : IRequest<List<SubCustomerBillsDTo>>;

    public class
        GetSubCustomerBillsHandler : IRequestHandler<GetSubCustomersBillsQuery, List<SubCustomerBillsDTo>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;

        public GetSubCustomerBillsHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
        }

        public Task<List<SubCustomerBillsDTo>> Handle(GetSubCustomersBillsQuery request,
            CancellationToken cancellationToken)
        {
            var result = _dbContext.SubCustomerTransactions
                .Include(a => a.SubCustomerAccountRate)
                .ThenInclude(a => a.SubCustomerAccount)
                .Where(a => a.SubCustomerAccountRate.SubCustomerAccount.CustomerId ==
                            _httpUserContext.GetCurrentUserId().ToGuid())
                .Where(a => request.SubCustomerId == Guid.Empty ||
                            a.SubCustomerAccountRate.SubCustomerAccountId == request.SubCustomerId)
                .Where(a => a.CreatedDate.Value.Date >= request.FromDate.Date &&
                            a.CreatedDate.Value.Date <= request.ToDate.Date);
            if (request.SubCustomerId.IsEmptyGuid())
            {
                return Task.FromResult(
                    result
                        .GroupBy(a => a.PriceName)
                        .Select(a => new SubCustomerBillsDTo()
                        {
                            CurrencyName = a.Key,
                            TotalBord = a.Where(b =>
                                    b.TransactionType == TransactionTypes.Withdrawal ||
                                    b.TransactionType == TransactionTypes.WithdrawalWithDebt
                                )
                                .Sum(b => b.Amount).ToString(),
                            TotalRasid = a.Where(b =>
                                    b.TransactionType == TransactionTypes.Deposit
                                )
                                .Sum(b => b.Amount).ToString(),
                            TotalHawala = a.Where(b =>
                                    b.TransactionType == TransactionTypes.Transfer ||
                                    b.TransactionType == TransactionTypes.TransferWithDebt
                                )
                                .Sum(b => b.Amount).ToString(CultureInfo.InvariantCulture),
                            TotalBedehi = result.Where(b=>b.PriceName==a.Key)
                                .Select(b=>b.SubCustomerAccountRate).Distinct()
                                .Where(b=>b.Amount<0)
                                .Sum(b=>b.Amount),
                            TotalTalab= result.Where(b=>b.PriceName==a.Key)
                                .Select(b=>b.SubCustomerAccountRate).Distinct()
                                .Where(b=>b.Amount>0)
                                .Sum(b=>b.Amount)
                        }).ToList());
            }
            return Task.FromResult(
                result
                .GroupBy(a => a.PriceName)
                .Select(a => new SubCustomerBillsDTo()
                {
                    CurrencyName = a.Key,
                    TotalBord = a.Where(b =>
                            b.TransactionType == TransactionTypes.Withdrawal ||
                            b.TransactionType == TransactionTypes.WithdrawalWithDebt
                        )
                        .Sum(b => b.Amount).ToString(),
                    TotalRasid = a.Where(b =>
                            b.TransactionType == TransactionTypes.Deposit 
                        )
                        .Sum(b => b.Amount).ToString(),
                    TotalHawala = a.Where(b =>
                            b.TransactionType == TransactionTypes.Transfer ||
                            b.TransactionType == TransactionTypes.TransferWithDebt
                        )
                        .Sum(b => b.Amount).ToString(CultureInfo.InvariantCulture),
                    TotalBills = result.Where(b=>b.PriceName==a.Key)
                        .Select(b=>b.SubCustomerAccountRate).Distinct()
                        .Sum(b=>b.Amount)
                }).ToList());
        }
    }
}