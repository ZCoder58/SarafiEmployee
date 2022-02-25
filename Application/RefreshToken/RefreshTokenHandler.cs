using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Models.RefreshTokensModel;
using Application.Common.Security;
using Application.Common.Security.Customer;
using Application.Common.Statics;
using Domain.Interfaces;
using MediatR;

namespace Application.RefreshToken
{
    public class RefreshTokenHandler : IRequestHandler<RefreshTokenCommand, RefreshTokenDto>
    {
        private readonly JwtService _jwtOptions;
        private readonly IHttpUserContext _httpContext;
        public RefreshTokenHandler(JwtService jwtOptions, IHttpUserContext httpContext)
        {
            _jwtOptions = jwtOptions;
            _httpContext = httpContext;
        }

        public Task<RefreshTokenDto> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            string newToken = "";
            if (_httpContext.GetUserType() == UserTypes.CustomerType)
            {
                newToken = _jwtOptions.RefreshToken(new CustomerRefreshTokenModel(request.Token,_httpContext));
            }else if (_httpContext.GetUserType() == UserTypes.CompanyType)
            {
                newToken = _jwtOptions.RefreshToken(new CompanyRefreshTokenModel(request.Token,_httpContext));
            }else if (_httpContext.GetUserType() == UserTypes.ManagementType)
            {
                newToken = _jwtOptions.RefreshToken(new SunriseAdminUserRefreshTokenModel(request.Token));
            }
            else
            {
                throw new UnAuthorizedException();
            }
            return Task.FromResult(new RefreshTokenDto()
            {
                Token = newToken,
                IsSuccess = true
            });
        }
    }
}