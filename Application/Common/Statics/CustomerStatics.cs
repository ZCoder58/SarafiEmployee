using System;
using System.IO;
using System.Security.Claims;

namespace Application.Common.Statics
{
    public static class CustomerStatics
    {
        public static string FilesSavePath(Guid customerId)
        {
                
            return Path.Combine("images","customers",customerId.ToString(),"photos");
        } 

        public static Claim[] DefaultCustomerClaim(string photo,string name,string lastName,string isPremiumAccount)
        {
            return new[]
            {
                new Claim("photo", photo??""),
                new Claim("name", name),
                new Claim("lastName", lastName??""),
                new Claim("isPremiumAccount", isPremiumAccount)
            };
        }
    }
}