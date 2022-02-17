using System.Linq;
using Application.Common.Extensions;
using Domain.Interfaces;
using FluentValidation;

namespace Application.Website.Customers.Auth.Command.ActivateCustomerAccount
{
    public class ActivateCustomerAccountValidation:AbstractValidator<ActivateCustomerAccountCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        public ActivateCustomerAccountValidation(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            RuleFor(a => a.Id)
                .NotNull()
                .Must(ValidId).WithMessage("درخواست رد شد");
        }

        public bool ValidId(string id)
        {
            return _dbContext.Customers.Any(a =>
                !a.IsEmailVerified &&
                a.ActivationAccountCode == id);
        }
    }
}