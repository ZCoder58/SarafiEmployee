﻿using System;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Friend.Extensions;
using Application.Customer.Transfers.Statics;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Transfers.Commands.CreateTransfer
{
    public class CreateTransferValidation:AbstractValidator<CreateTransferCommand>
    {
        public CreateTransferValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.Amount)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("مقدار پول ارسالی ضروری میباشد")
                .GreaterThan(10).WithMessage("کمتر از 10 مجاز نیست");
            RuleFor(a => a.CodeNumber)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("کود حواله ضروری میباشد");
            RuleFor(a => a.FCurrency)
                .NotNull().WithMessage("انتخاب واحد پول ارسالی ضروری میباشد");   
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
            RuleFor(a => a.ExchangeType)
                .NotNull().WithMessage("نوعیت تبادل ارز ضروری میباشد");
        }
    }
}