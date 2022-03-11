﻿using System;
using System.Threading;
using System.Threading.Tasks;
using Application.SubCustomers.Commands.Transactions.CreateTransaction;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.CustomerAccounts.Commands.Transactions.CreateTransaction
{
    public class CCreateTransactionHandler:IRequestHandler<CCreateTransactionCommand,Guid>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public CCreateTransactionHandler(IApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<Guid> Handle(CCreateTransactionCommand request, CancellationToken cancellationToken)
        {
            var newTransaction= await _dbContext.CustomerAccountTransactions.AddAsync(
               _mapper.Map<CustomerAccountTransaction>(request), cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return newTransaction.Entity.Id;
        }
    }
}