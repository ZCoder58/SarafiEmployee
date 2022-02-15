using Application.Common.Extensions;
using Application.Customer.Friend.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Friend.Commands.SendFriendRequest
{
    public class SendFriendRequestValidation:AbstractValidator<SendFriendRequestCommand>
    {
        public SendFriendRequestValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.CustomerId)
                .NotNull().WithMessage("ای دی ضروری میباشد")
                .Must(customerId => dbContext.Friends
                    .IsNotFriends(httpUserContext.GetCurrentUserId().ToGuid(),
                        customerId)).WithMessage("درخواست رد شد");
        }
    }
}