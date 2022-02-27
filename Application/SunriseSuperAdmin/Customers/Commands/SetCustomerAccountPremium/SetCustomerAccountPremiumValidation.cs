using System;
using System.Linq;
using Domain.Interfaces;
using FluentValidation;

namespace Application.SunriseSuperAdmin.Customers.Commands.SetCustomerAccountPremium
{
    public class SetCustomerAccountPremiumValidation:AbstractValidator<SetCustomerAccountPremiumCommand>
    {
        public SetCustomerAccountPremiumValidation(IApplicationDbContext dbContext)
        {
            RuleFor(a => a.Id)
                .NotEqual(Guid.Empty).WithMessage("ای دی ضروری میباشد")
                .Must(id => dbContext.Customers.Any(a => a.Id == id && !a.IsPremiumAccount))
                .WithMessage("قبلا انجام شده است");
        }
    }
}