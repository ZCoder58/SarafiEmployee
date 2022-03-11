// using System;
// using System.Linq;
// using Application.Common.Extensions;
// using Application.Customer.Friend.Extensions;
// using Application.SubCustomers.Commands.UpdateAccountAmount.TransferToAccount;
// using Domain.Interfaces;
// using FluentValidation;
//
// namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.TransferToAccount
// {
//     public class CustomerTransferToAccountValidation : AbstractValidator<CustomerTransferToAccountCommand>
//     {
//         public CustomerTransferToAccountValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext)
//         {
//             
//             RuleFor(a => a.ToCustomerId)
//                 .NotEqual(Guid.Empty).WithMessage("ای دی همکار شما ضروری میباشد")
//                 .Must(toCustomerId => dbContext.Friends.IsApprovedCustomersFriend(toCustomerId,httpUserContext.GetCurrentUserId().ToGuid())).WithMessage("مشتری دوم پیدا نشد");
//             RuleFor(a => a.ToCustomerAccountId)
//                 .NotEqual(Guid.Empty).WithMessage("حساب ارز همکاری شما ضروری میباشد")
//                 .Must((model, customerAccountId) => dbContext.CustomerAccounts.Any(a =>
//                     a.Id == customerAccountId &&
//                     a.CustomerId == model.ToCustomerId)).WithMessage("حساب ارز همکار شما پیدا نشد");
//             RuleFor(a => a.CustomerAccountId)
//                 .NotEqual(Guid.Empty).WithMessage("حساب ارز شما ضروری میباشد")
//                 .Must((model, customerAccountId) => dbContext.CustomerAccounts.Any(a =>
//                     a.Id == customerAccountId &&
//                     a.CustomerId == httpUserContext.GetCurrentUserId().ToGuid())).WithMessage("حساب ارز شما پیدا نشد");
//             RuleFor(a => a.Amount)
//                 .NotNull().WithMessage("مقدرار ضروری میباشد")
//                 .GreaterThanOrEqualTo(1).WithMessage("کمتر از 1 مجاز نیست")
//                 .Must((model,amount)=>dbContext.CustomerAccounts.Any(a=>
//                     a.Id==model.CustomerAccountId &&
//                     a.Amount>=amount)).WithMessage("مقدار پول کافی در حساب شما وجود ندارد");
//
//         }
//     }
// }