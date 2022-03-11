using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Customer.CustomerAccounts.Extensions;
using Application.SubCustomers.Commands.UpdateAccountAmount.WithdrawalTransfer;
using Domain.Interfaces;
using Domain.Interfaces.IHubs.IAccessors;
using FluentValidation;

namespace Application.Customer.CustomerAccounts.Commands.UpdateAccountAmount.WithdrawalTransfer
{
    public class CWithdrawalAccountTransferValidation : AbstractValidator<CWithdrawalAccountTransferCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly INotifyHubAccessor _notify;
        private readonly IHttpUserContext _httpUserContext;

        public CWithdrawalAccountTransferValidation(IApplicationDbContext dbContext,
            INotifyHubAccessor notify,
            IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _notify = notify;
            _httpUserContext = httpUserContext;
            RuleFor(a => a.TransferId)
                .NotEqual(Guid.Empty)
                .NotNull().WithMessage("ای دی حواله ضروری میباشد");
            RuleFor(a => a.RateCountryId)
                .NotEqual(Guid.Empty).WithMessage("ای دی حساب شما ضروری میباشد")
                .Must(rateCountryId => dbContext.CustomerAccounts.IsExistsByCountryRateId(
                    httpUserContext.GetCurrentUserId().ToGuid(),
                    rateCountryId)).WithMessage("حساب شما پیدا نشد");
            RuleFor(a => a.Amount)
                .NotNull().WithMessage("مقدار پول ضروری میباشد")
                .GreaterThanOrEqualTo(1).WithMessage("کم تر از 1 مجاز نیست")
                .MustAsync(CheckForAvailableAmount).WithMessage("مقدار پول کافی در حساب شما وجود ندارد");
        }

        public async Task<bool> CheckForAvailableAmount(CWithdrawalAccountTransferCommand model,double amount,CancellationToken cancellationToken)
        {
            var hasEnoughMoney= _dbContext.CustomerAccounts.HasEnoughAmount(
                model.RateCountryId,
                _httpUserContext.GetCurrentUserId().ToGuid(),
                amount);
            if (!hasEnoughMoney)
            {
                await _notify.NotifySelfAsync("مقدار موجودی دخل شما کم است","error");
            }
            return await Task.FromResult(hasEnoughMoney);
        }
    }
}