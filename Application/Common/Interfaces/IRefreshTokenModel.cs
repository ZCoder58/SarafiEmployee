using System.Collections.Generic;
using System.Security.Claims;

namespace Application.Common.Interfaces
{
    public interface IRefreshTokenModel
    {
        public string Token { get; set; }
        public IEnumerable<Claim> Claims { get; set; }
    }
}