using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Domain.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Website.Management.Auth.Command.Login
{
    public class ManagementLoginValidation:AbstractValidator<ManagementLoginCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        public ManagementLoginValidation(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            RuleFor(a => a.Password).NotNull().WithMessage("رمز عبور ضروری میباشد");
            RuleFor(a => a.UserName)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("نام کاربری ضروری میباشد")
                .Must(Exist).WithMessage("نام کاربری و یا رمز عبور اشتباه میباشد");
        }
        public bool Exist(ManagementLoginCommand model,string userName)
        {
            var user= _dbContext.AdminUsers.GetUser(userName,model.Password);
            return user.IsNotNull();
        }
    }
}