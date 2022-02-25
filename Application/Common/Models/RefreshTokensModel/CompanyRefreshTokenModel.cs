using System.Collections.Generic;
using System.Security.Claims;
using Application.Common.Extensions;
using Application.Common.Interfaces;
using Application.Common.Statics;
using Domain.Interfaces;

namespace Application.Common.Models.RefreshTokensModel
{
    public class CompanyRefreshTokenModel:IRefreshTokenModel
    {
        public CompanyRefreshTokenModel(string token, IHttpUserContext httpUserContext)
        {
            Token = token;
            Claims = CustomerStatics.DefaultCompanyClaim(
                httpUserContext.GetCompanyId().ToGuid(),
            httpUserContext.GetProfilePhoto(),
            httpUserContext.GetName(),
            httpUserContext.GetLastName());
        }
        public string Token { get; set; }
        public IEnumerable<Claim> Claims { get; set; }
    }
}