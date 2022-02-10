using Domain.Common;
using Domain.Interfaces;

namespace Domain.Entities
{
    public class AdminUser:BaseEntity,IAuthUser
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}