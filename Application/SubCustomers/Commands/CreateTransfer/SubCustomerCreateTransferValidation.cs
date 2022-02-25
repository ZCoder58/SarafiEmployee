using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Customer.Friend.Extensions;
using Application.Customer.Transfers.Commands.CreateTransfer;
using Domain.Interfaces;
using FluentValidation;

namespace Application.SubCustomers.Commands.CreateTransfer
{
    public class SubCustomerCreateTransferValidation:AbstractValidator<SubCustomerCreateTransferCommand>
    {
        public SubCustomerCreateTransferValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
          
            RuleFor(a => a.CodeNumber)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("کود حواله ضروری میباشد")
                .ExclusiveBetween(50, 5001).WithMessage("کود نمبر حواله درست نمیباشد"); 
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
                .GreaterThan(10).WithMessage("کمتر از 10 مجاز نیست")
                .Must((model,amount)=>dbContext.SubCustomerAccountRates.Any(a=>
                    a.Id==model.SubCustomerAccountRateId &&
                    a.Amount>= (amount+model.Fee))).WithMessage("این مقدار پول در حساب مشتری وجود ندارد");
        }
    }
}