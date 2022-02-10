using System.Threading.Tasks;
using Application.RefreshToken;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers
{
    [Authorize]
    [Route("api/Auth/[action]")]
    public class AuthController : ApiBaseController
    {
        [HttpPost]
        public Task<RefreshTokenDto> RefreshToken([FromBody]RefreshTokenCommand request)
        {
            return Mediator.Send(request);
        }
    }
}