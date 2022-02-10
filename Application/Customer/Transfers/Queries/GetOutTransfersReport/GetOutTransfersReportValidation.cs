using Application.Common.Extensions;
using Application.Customer.Friend.Extensions;
using Application.Customer.Transfers.Queries.GetInTransfersReport;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Transfers.Queries.GetOutTransfersReport
{
    public class GetOutTransfersReportValidation:AbstractValidator<GetOutTransfersReportQuery>
    {
        private readonly IApplicationDbContext _dbContext;
        public GetOutTransfersReportValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
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