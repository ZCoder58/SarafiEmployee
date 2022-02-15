using System;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Friend.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Friend.Commands.CancelFriendRequest
{
    public class CancelFriendRequestValidation:AbstractValidator<CancelFriendRequestCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        public CancelFriendRequestValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            RuleFor(a => a.CustomerId)
                .NotNull().WithMessage("ای دی ضروری میباشد")
                .Must(customerId=>dbContext.Friends.IsNotApprovedRequest(
                    httpUserContext.GetCurrentUserId().ToGuid(),customerId)).WithMessage("درخواست رد شد");
        }
    }
}