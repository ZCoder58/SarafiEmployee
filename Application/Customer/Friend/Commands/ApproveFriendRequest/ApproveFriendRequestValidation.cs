using System;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Friend.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Friend.Commands.ApproveFriendRequest
{
    public class ApproveFriendRequestValidation:AbstractValidator<ApproveFriendRequestCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        public ApproveFriendRequestValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            RuleFor(a => a.CustomerId)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("ای دی ضروری میباشد")
                .Must(customerId=>_dbContext.Friends.IsNotApprovedRequest(httpUserContext.GetCurrentUserId().ToGuid(),customerId)).WithMessage("درخواست رد شد");
        }
    }
}