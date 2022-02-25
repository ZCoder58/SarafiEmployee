using System;
using Application.Customer.Friend.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Friend.Commands.CreateFriendRequest
{
    public class CreateFriendRequestValidation:AbstractValidator<CreateFriendRequestCommand>
    {
        public CreateFriendRequestValidation(IApplicationDbContext dbContext)
        {
            RuleFor(a => a.WithCustomerId)
                .NotEqual(Guid.Empty).WithMessage("ای دی ضروری میباشد")
                .Must((model,withCustomerId) => dbContext.Friends
                    .IsNotFriends(model.WhoCustomerId,
                        withCustomerId)).WithMessage("درخواست رد شد");
            RuleFor(a => a.WhoCustomerId)
                .NotEqual(Guid.Empty).WithMessage("ای دی ضروری میباشد");
        }
    }
}