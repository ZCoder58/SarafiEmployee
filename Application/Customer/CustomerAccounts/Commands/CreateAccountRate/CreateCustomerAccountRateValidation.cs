using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.CustomerAccounts.Commands.CreateAccountRate
{
    public class CreateCustomerAccountRateValidation:AbstractValidator<CreateCustomerAccountRateCommand>
    {
        public CreateCustomerAccountRateValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.Amount)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("مقدار پول اولیه حساب ضروری میباشد")
                .GreaterThanOrEqualTo(0).WithMessage("کم تر از صفر مجاز نیست");
            RuleFor(a => a.RatesCountryId)
                .Cascade(CascadeMode.Stop)
                .NotEqual(Guid.Empty).WithMessage("انتخاب نوع ارز ضروری میباشد")
                .Must(dbContext.RatesCountries.IsExists).WithMessage("ارز نامعتبر")
                .Must((model, ratesCountryId)=>!dbContext.CustomerAccounts.Any(a=>
                    a.CustomerId==httpUserContext.GetCurrentUserId().ToGuid() &&
                    a.RatesCountryId==ratesCountryId)).WithMessage("حساب با این ارز قبلا اضافه شده است");
        }
    }
}