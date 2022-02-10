using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Website.Customers.Auth.Command.Login
{
    public class CustomerLoginValidation:AbstractValidator<CustomerLoginCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        public CustomerLoginValidation(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            RuleFor(a => a.Password).NotNull().WithMessage("رمز عبور ضروری میباشد");
            RuleFor(a => a.UserName)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("نام کاربری ضروری میباشد")
                .Must(Exist).WithMessage("نام کاربری و یا رمز عبور اشتباه میباشد")
                .MustAsync(EmailVerifiedAsync)
                .WithMessage("ایمیل آدرس شما هنوز فعال نشده است لطفا به ایمیل خود مراجعه نمایید")
                .MustAsync(AccountIsActiveAsync).WithMessage("حساب شما غیر فعال شده است");
        }
        public bool Exist(CustomerLoginCommand model,string email)
        {
            var user= _dbContext.Customers.GetUser(email,model.Password);
            return user.IsNotNull();
        }
        public async Task<bool> EmailVerifiedAsync(string userName,CancellationToken cancellationToken)
        {
            var user= await _dbContext.Customers.FirstOrDefaultAsync(a => a.UserName == userName,cancellationToken);
            if (user.IsNotNull() && user.IsEmailVerified)
            {
                return true;
            }
            return false;
        }
        public async Task<bool> AccountIsActiveAsync(string userName,CancellationToken cancellationToken)
        {
            var user= await _dbContext.Customers.FirstOrDefaultAsync(a => a.UserName == userName,cancellationToken);
            if (user.IsNotNull() && user.IsActive)
            {
                return true;
            }
            return false;
        }
    }
}