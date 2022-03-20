using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Friend.Extensions;
using Application.Customer.Transfers.Extensions;
using Domain.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Components.Forms;

namespace Application.Customer.Transfers.Commands.ForwardTransfer
{
    public class ForwardTransferValidation:AbstractValidator<ForwardTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _userContext;

        public ForwardTransferValidation(IApplicationDbContext dbContext,IHttpUserContext userContext)
        {
            _dbContext = dbContext;
            _userContext = userContext;
            RuleFor(a => a.TransferId)
                .NotNull()
                .NotEqual(Guid.Empty)
                .WithMessage("ای دی حواله ضروری میباشد")
                .Must(tId => dbContext.Transfers.Any(a => 
                    a.ReceiverId == userContext.GetCurrentUserId().ToGuid() &&
                                                          a.State == TransfersStatusTypes.InProgress) &&
                             !dbContext.Transfers.IsForwarded(tId))
                .WithMessage("حواله نامعتبر");
            RuleFor(a => a.FriendId)
                .NotNull()
                .NotEqual(Guid.Empty)
                .WithMessage("ای دی همکار ضروری میباشد")
                .Must(fId => dbContext.Friends.IsCustomerApprovedFriend(userContext.GetCurrentUserId().ToGuid(),
                    fId))
                .WithMessage("ای دی همکار نامعتبر")
                .Must(IsNotAForwardedOrForwarder).WithMessage("ارجاع به شخص ارسال کننده مجاز نیست");

        }

        public bool IsNotAForwardedOrForwarder(ForwardTransferCommand model, Guid friendId)
        {
            var targetFriend=_dbContext.Friends.GetById(model.FriendId);
            return !_dbContext.Transfers.IsAForwardedOrForwarder(targetFriend.CustomerFriendId.ToGuid(),model.TransferId);
        }
    }
}