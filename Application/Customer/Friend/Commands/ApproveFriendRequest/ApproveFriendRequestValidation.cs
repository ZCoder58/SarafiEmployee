using System;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
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
            RuleFor(a => a.FriendId)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("ای دی ضروری میباشد")
                .Must(ValidForApprove).WithMessage("درخواست رد شد");
        }
        public bool ValidForApprove(Guid friendId)
        {
            var targetFriendRequest = _dbContext.Friends.GetById(friendId);
            return targetFriendRequest.IsNotNull() &&
                   targetFriendRequest.CustomerFriendId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                   !targetFriendRequest.CustomerFriendApproved;
        }
    }
}