using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Friend.Extensions;
using Application.Customer.Transfers.Statics;
using Domain.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.SubCustomers.Commands.EditTransfer

{
    public class SubCustomerEditTransferValidation:AbstractValidator<SubCustomerEditTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        public SubCustomerEditTransferValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            RuleFor(a => a.Id)
                .Cascade(CascadeMode.Stop)
                .NotEqual(Guid.Empty).WithMessage("ای دی ضروری میباشد")
                .Must((model,id)=>dbContext.Transfers.Any(a=>
                    a.Id==id &&
                    a.SubCustomerAccountId==model.SubCustomerAccountId &&
                    a.SenderId==httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.State==TransfersStatusTypes.InProgress &&
                    a.AccountType==TransferAccountTypesStatic.SubCustomerAccount)).WithMessage("درخواست شما رد شد");
            RuleFor(a => a.FromName)
                .NotNull().WithMessage("نام ارسال کننده پول ضروری میباشد");
            RuleFor(a => a.FromName)
                .NotNull().WithMessage("ولد ارسال کننده پول ضروری میباشد");
            RuleFor(a => a.FromPhone)
                .NotNull().WithMessage("شماره تماس ارسال کننده پول ضروری میباشد");
            RuleFor(a => a.TCurrency)
                .NotNull().WithMessage("انتخاب واحد پول دریافتی ضروری میباشد");
            RuleFor(a => a.ToName)
                .NotNull().WithMessage("نام دریافت کننده ضروری میباشد");
            RuleFor(a => a.ToFatherName)
                .NotNull().WithMessage("ولد دریافت گننده پول ضروری میباشد"); 
            RuleFor(a => a.FriendId)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("انتخاب همکار ضروری میباشد")
                .Must(friendId => dbContext.Friends.IsCustomerApprovedFriend(
                    httpUserContext.GetCurrentUserId().ToGuid(),
                    friendId)).WithMessage("درخواست شما رد شد");
            RuleFor(a => a.Fee)
                .Cascade(CascadeMode.Stop)
                .GreaterThanOrEqualTo(0).WithMessage("کمتر از 0 مجاز نیست");
            RuleFor(a => a.ReceiverFee)
                .Cascade(CascadeMode.Stop)
                .GreaterThanOrEqualTo(0).WithMessage("کمتر از 0 مجاز نیست");
            RuleFor(a => a.SubCustomerAccountId)
                .NotEqual(Guid.Empty).WithMessage("انتخاب مشتری ضروری میباشد")
                .Must(subCustomerId => dbContext.SubCustomerAccounts.Any(
                    a => a.Id == subCustomerId &&
                         a.CustomerId == httpUserContext.GetCurrentUserId().ToGuid())).WithMessage("مشتری پیدا نشد");
            RuleFor(a => a.SubCustomerAccountRateId)
                .NotEqual(Guid.Empty).WithMessage("انتخاب حساب مشتری ضروری میباشد")
                .Must((model, subCustomerAccountRateId) => dbContext.SubCustomerAccountRates.Any(
                    a => a.SubCustomerAccountId == model.SubCustomerAccountId &&
                         a.Id == subCustomerAccountRateId)).WithMessage("حساب مشتری پیدا نشد");
            RuleFor(a => a.Amount)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("مقدار پول ارسالی ضروری میباشد")
                .GreaterThan(10).WithMessage("کمتر از 10 مجاز نیست");

        }

        // public bool ValidAmount(SubCustomerEditTransferCommand model, double amount)
        // {
        //     var targetTransfer = _dbContext.Transfers.GetById(model.Id);
        //     var lastSubCustomerAccountRate = _dbContext.SubCustomerAccountRates
        //         .Include(a=>a.RatesCountry)
        //         .FirstOrDefault(a => 
        //             a.SubCustomerAccountId==targetTransfer.SubCustomerAccountId &&
        //             a.RatesCountry.PriceName == targetTransfer.FromCurrency);
        //     var newSubCustomerAccountRate = _dbContext.SubCustomerAccountRates
        //         .Include(a=>a.RatesCountry)
        //         .FirstOrDefault(a => 
        //             a.SubCustomerAccountId==targetTransfer.SubCustomerAccountId &&
        //             a.Id==model.SubCustomerAccountRateId);
        //     if (lastSubCustomerAccountRate.Id == newSubCustomerAccountRate.Id)
        //     {
        //         return (lastSubCustomerAccountRate.Amount + (targetTransfer.SourceAmount + targetTransfer.Fee)) >=
        //                (model.Amount + model.Fee);
        //     }
        //
        //     return newSubCustomerAccountRate.Amount >= model.Amount+model.Fee;
        // }
    }
}