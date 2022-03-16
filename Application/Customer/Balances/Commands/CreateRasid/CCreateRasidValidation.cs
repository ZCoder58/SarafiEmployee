using System;
using System.Linq;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Balances.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Customer.Balances.Commands.CreateRasid
{
    public class CCreateRasidValidation:AbstractValidator<CCreateRasidCommand>
    {
        public CCreateRasidValidation(IApplicationDbContext dbContext,IHttpUserContext httpUserContext)
        {
            RuleFor(a => a.RateCountryId)
                .NotNull()
                .NotEqual(Guid.Empty).WithMessage("ای دی ارز ضروری میباشد")
                .Must(rateId => dbContext.RatesCountries.IsExists(rateId)).WithMessage("ای دی ارز نامعتبر");
            RuleFor(a => a.Amount)
                .NotNull().WithMessage("مقدار رسید ضروری میباشد")
                .GreaterThanOrEqualTo(1).WithMessage("کمتر از 1 مجاز نیست")
                .Must((model,amount)=>
                    dbContext.CustomerBalances.HaveTalab(model.CustomerId,model.CustomerFriendId,amount))
                .WithMessage("شما هیج طلبی  با این ارز ندارید");
        }
    }
}