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
            RuleFor(a => a.CustomerId)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("ای دی ضروری میباشد")
                .Must(customerId =>
                    dbContext.Friends.IsNotApprovedRequest(httpUserContext.GetCurrentUserId().ToGuid(),customerId))
                .WithMessage("در خواست رد شد");
        }
    }
}