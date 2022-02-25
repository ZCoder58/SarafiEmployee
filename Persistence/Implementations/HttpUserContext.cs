using System.Security.Claims;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Persistence.Implementations
{
    public class HttpUserContext:IHttpUserContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HttpUserContext(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetCurrentUserId()
        {
            return _httpContextAccessor.HttpContext?.User.FindFirstValue("userId");
        }

        public string GetUserType()
        {
            return _httpContextAccessor.HttpContext?.User.FindFirstValue("userType");
        }


        public string GetUserName()
        {
            return _httpContextAccessor.HttpContext?.User.FindFirstValue("userName");
        }

        public string GetProfilePhoto()
        {
            return _httpContextAccessor.HttpContext?.User.FindFirstValue("photo");
        }

        public string GetName()
        {
            return _httpContextAccessor.HttpContext?.User.FindFirstValue("name");
        }

        public string GetLastName()
        {
            return _httpContextAccessor.HttpContext?.User.FindFirstValue("lastName");
        }

        public string IsPremiumAccount()
        {
            return _httpContextAccessor.HttpContext?.User.FindFirstValue("isPremiumAccount");
        }

        public string GetCompanyId()
        {
            return _httpContextAccessor.HttpContext?.User.FindFirstValue("companyId");
        }
    }
}