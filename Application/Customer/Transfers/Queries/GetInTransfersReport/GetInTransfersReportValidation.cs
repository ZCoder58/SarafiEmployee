using System;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Friend.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Transfers.Queries.GetInTransfersReport
{
    public class GetInTransfersReportValidation:AbstractValidator<GetInTransfersReportQuery>
    {
        private readonly IApplicationDbContext _dbContext;
        public GetInTransfersReportValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
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