using System.Threading.Tasks;
using Application.Common.Models;
using Application.Website.Management.Auth.Command.Login;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.WebSite
{
    [Route("api/[controller]/[action]")]
    public class ManagementAuthController : ApiBaseController
    {
       [HttpPost]
        public Task<AuthResult> Login([FromForm]ManagementLoginCommand request)
        {
            return Mediator.Send(request);
        }
    }
}