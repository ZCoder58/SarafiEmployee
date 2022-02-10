using System.Collections.Generic;
using System.Security.Claims;
using Application.Common.Interfaces;
using Application.Common.Statics;
using Domain.Interfaces;

namespace Application.Common.Models.RefreshTokensModel
{
    public class CustomerRefreshTokenModel:IRefreshTokenModel
    {
        public CustomerRefreshTokenModel(string token, IHttpUserContext httpUserContext)
        {
            Token = token;
            Claims = CustomerStatics.DefaultCustomerClaim(
            httpUserContext.GetProfilePhoto(),
            httpUserContext.GetName(),
            httpUserContext.GetLastName(),
            httpUserContext.IsPremiumAccount());
        }
        public string Token { get; set; }
        public IEnumerable<Claim> Claims { get; set; }
    }
}