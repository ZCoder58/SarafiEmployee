// using System;
// using System.Threading;
// using System.Threading.Tasks;
// using Application.Common.Extensions;
// using Application.Common.Extensions.DbContext;
// using Application.Customer.CustomerAccounts.Commands.Transactions.CreateTransaction;
// using Application.Customer.CustomerAccounts.EventHandlers;
// using Application.Customer.ExchangeRates.Extensions;
// using Application.SubCustomers.Statics;
// using Domain.Interfaces;
// using MediatR;
// using Microsoft.EntityFrameworkCore;
//
// namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.TransferToAccount
// {
//     public class CustomerTransferToAccountHandler : IRequestHandler<CustomerTransferToAccountCommand>
//     {
//         private readonly IApplicationDbContext _dbContext;
//         private readonly IHttpUserContext _httpUserContext;
//         private readonly IMediator _mediator;
//
//         public CustomerTransferToAccountHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext,
//             IMediator mediator)
//         {
//             _dbContext = dbContext;
//             _httpUserContext = httpUserContext;
//             _mediator = mediator;
//         }
//
//         public async Task<Unit> Handle(CustomerTransferToAccountCommand request, CancellationToken cancellationToken)
//         {
//             var myAccount = _dbContext.CustomerAccounts
//                 .Include(a => a.RatesCountry)
//                 .GetById(request.CustomerAccountId);
//             var toCustomerAccount = _dbContext.CustomerAccounts
//                 .Include(a => a.RatesCountry)
//                 .GetById(request.ToCustomerAccountId);
//             var transactionType = TransactionTypes.;
//             //update myAccount amount 
//             myAccount.Amount -= request.Amount;
//             //update toCustomerAccount amount
//             var exchangeRateAmount = _dbContext.CustomerExchangeRates.ConvertCurrencyById(
//                 _httpUserContext.GetCurrentUserId().ToGuid(),
//                 myAccount.RatesCountryId,
//                 toCustomerAccount.RatesCountryId,
//                 request.Amount,
//                 request.Type);
//             toCustomerAccount.Amount += exchangeRateAmount;
//             await _dbContext.SaveChangesAsync(cancellationToken);
//             //////add sender transaction
//             await _mediator.Send(new CCreateTransactionCommand()
//             {
//                 Amount = request.Amount,
//                 Comment = request.Comment,
//                 PriceName = myAccount.RatesCountry.PriceName,
//                 TransactionType = transactionType,
//                 CustomerAccountId = myAccount.Id,
//                 ToCustomerAccountId = request.ToCustomerAccountId
//             }, cancellationToken);
//             ////  add receiver transaction
//             var toCustomerTransactionId = await _mediator.Send(new CCreateTransactionCommand()
//             {
//                 Amount = exchangeRateAmount,
//                 Comment = string.Concat(
//                     exchangeRateAmount,
//                     " ",
//                     myAccount.RatesCountry.PriceName,
//                     " از طرف ",
//                     myAccount.Customer.Name,
//                     " ولد ",
//                     myAccount.Customer.FatherName,
//                     " به این اکانت انتقال داده شد"),
//                 PriceName = toCustomerAccount.RatesCountry.PriceName,
//                 TransactionType = TransactionTypes.ReceivedFromAccount,
//                 ToCustomerAccountId = request.ToCustomerAccountId
//             }, cancellationToken);
//             await _mediator.Publish(new CustomerAccountToAccountTransferred(
//                 toCustomerAccount.CustomerId,
//                 toCustomerTransactionId), cancellationToken);
//             return Unit.Value;
//         }
//     }
// }