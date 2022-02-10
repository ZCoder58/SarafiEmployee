using System;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Friend.Extensions;
using Domain.Interfaces;
using Domain.Interfaces.IHubs.IAccessors;
using FluentValidation;

namespace Application.Customer.Friend.Commands.DeleteFriendRequest
{
    public class DeleteFriendRequestValidation:AbstractValidator<DeleteFriendRequestCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        public DeleteFriendRequestValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            RuleFor(a => a.FriendId)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("ای دی ضروری میباشد")
                .Must(ValidForDelete).WithMessage("درخواست رد شد");
        }

        public bool ValidForDelete(Guid friendId)
        {
            var targetFriendRequest = _dbContext.Friends.GetById(friendId);
            return targetFriendRequest.IsNotNull() &&
                   targetFriendRequest.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid() &&
                   targetFriendRequest.CustomerFriendApproved;
        }
    }
}