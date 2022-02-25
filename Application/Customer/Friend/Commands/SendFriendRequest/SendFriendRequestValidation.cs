using System;
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
                .NotEqual(Guid.Empty).WithMessage("ای دی ضروری میباشد");
        }
    }
}