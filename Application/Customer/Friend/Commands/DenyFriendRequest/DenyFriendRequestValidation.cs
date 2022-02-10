using Application.Common.Extensions;
using Application.Customer.Friend.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Friend.Commands.DenyFriendRequest
{
    public class DenyFriendRequestValidation:AbstractValidator<DenyFriendRequestCommand>
    {
        public DenyFriendRequestValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.FriendId)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("ای دی ضروری میباشد")
                .Must(friendId =>
                    dbContext.Friends.IsRequestSentToCustomer(friendId, httpUserContext.GetCurrentUserId().ToGuid()))
                .WithMessage("در خواست رد شد");
        }
    }
}