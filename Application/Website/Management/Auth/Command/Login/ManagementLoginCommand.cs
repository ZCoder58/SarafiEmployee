using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions.DbContext;
using Application.Common.Models;
using Application.Common.Security;
using Application.Common.Statics;
using Domain.Interfaces;
using MediatR;

namespace Application.Website.Management.Auth.Command.Login
{
    public record ManagementLoginCommand(string UserName, string Password) : IRequest<AuthResult>;

    public class ManagementLoginCommandHandler : IRequestHandler<ManagementLoginCommand, AuthResult>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly JwtService _jwtOptions;

        public ManagementLoginCommandHandler(IApplicationDbContext dbContext, JwtService jwtOptions)
        {
            _dbContext = dbContext;
            _jwtOptions = jwtOptions;
        }

        public Task<AuthResult> Handle(ManagementLoginCommand request, CancellationToken cancellationToken)
        {
            var targetUser = _dbContext.AdminUsers.GetUser(request.UserName, request.Password);
            var token = _jwtOptions.GenerateToken(targetUser.UserName,targetUser.Id,UserTypes.ManagementType,null);
            return Task.FromResult(new AuthResult()
            {
                Token = token
            });
        }
    }
}