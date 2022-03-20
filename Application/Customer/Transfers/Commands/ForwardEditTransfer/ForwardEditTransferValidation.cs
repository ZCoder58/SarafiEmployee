using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.Customer.Friend.Extensions;
using Application.Customer.Transfers.Commands.EditTransfer;
using Application.Customer.Transfers.Extensions;
using Application.Customer.Transfers.Statics;
using Domain.Interfaces;
using Domain.Interfaces.IHubs.IAccessors;
using FluentValidation;

namespace Application.Customer.Transfers.Commands.ForwardEditTransfer
{
    public class ForwardEditTransferValidation : AbstractValidator<ForwardEditTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly INotifyHubAccessor _notify;

        public ForwardEditTransferValidation(IApplicationDbContext dbContext, IHttpUserContext httpUserContext,
            INotifyHubAccessor notify)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _notify = notify;
            RuleFor(a => a.Id)
                .Cascade(CascadeMode.Stop)
                .NotEqual(Guid.Empty).WithMessage("ای دی ضروری میباشد")
                .Must((model, id) => dbContext.Transfers.Any(a =>
                    a.Id == id &&
                    (a.SenderId == httpUserContext.GetCurrentUserId().ToGuid() ||
                     model.EnableEditForwarded) &&
                    a.ParentForwardedId != null &&
                    (a.State == TransfersStatusTypes.InProgress ||
                     a.State == TransfersStatusTypes.Denied) &&
                    a.AccountType == TransferAccountTypesStatic.MyAccount)).WithMessage("درخواست شما رد شد");
            RuleFor(a => a.FriendId)
                .Cascade(CascadeMode.Stop)
                .Must((model, friendId) => (model.EnableEditForwarded ||
                                            dbContext.Friends.IsCustomerApprovedFriend(
                                                httpUserContext.GetCurrentUserId().ToGuid(),
                                                friendId.ToGuid()))).WithMessage("انتخاب همکار ضروری میباشد")
                .Must(IsNotAForwardedOrForwarder).WithMessage("ارجاع به شخص ارسال کننده مجاز نیست");
            RuleFor(a => a.ReceiverFee)
                .Cascade(CascadeMode.Stop)
                .GreaterThanOrEqualTo(0).WithMessage("کمتر از 0 مجاز نیست");
        }

       
        public bool IsNotAForwardedOrForwarder(ForwardEditTransferCommand model, Guid? friendId)
        {
            var targetFriend = _dbContext.Friends.GetById(friendId.ToGuid());
            var targetTransfer = _dbContext.Transfers.GetById(model.Id);
            return model.EnableEditForwarded ||!_dbContext.Transfers.IsAForwardedOrForwarder(targetFriend.CustomerFriendId.ToGuid(),
                targetTransfer.Id, model.Id) ;
        }
    }
}