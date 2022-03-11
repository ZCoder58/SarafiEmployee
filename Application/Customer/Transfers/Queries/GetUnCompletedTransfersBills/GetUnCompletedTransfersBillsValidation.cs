using Application.Common.Extensions;
using Application.Customer.Friend.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Transfers.Queries.GetUnCompletedTransfersBills
{
    public class GetUncompletedTransfersBillsQueryValidation:AbstractValidator<GetUnCompletedTransfersBillsQuery>
    {
        public GetUncompletedTransfersBillsQueryValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.FromDate)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("انتخاب تاریخ شروع گزارش ضروری میباشد");
            RuleFor(a => a.ToDate)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("انتخاب تاریخ ختم گزارش ضروری میباشد");
            RuleFor(a => a.FriendId)
                .Cascade(CascadeMode.Stop)
                .Must(friendId =>friendId.IsEmptyGuid()|| dbContext.Friends.IsCustomerApprovedFriend(
                    httpUserContext.GetCurrentUserId().ToGuid(),
                    friendId) ).WithMessage("درخواست رد شد");
        }
    }
}