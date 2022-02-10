using System.Collections.Generic;
using System.Security.Claims;
using Application.Common.Interfaces;

namespace Application.Common.Models.RefreshTokensModel
{
    public class SunriseAdminUserRefreshTokenModel:IRefreshTokenModel
    {
        public SunriseAdminUserRefreshTokenModel(string token)
        {
            Token = token;
        }
        public string Token { get; set; }
        public IEnumerable<Claim> Claims { get; set; }
    }
}