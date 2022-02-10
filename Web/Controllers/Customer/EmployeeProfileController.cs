using System.Threading.Tasks;
using Application.Customer.Profile.Commands.ChangePassword;
using Application.Customer.Profile.Commands.ChangeProfilePhoto;
using Application.Customer.Profile.Commands.EditProfile;
using Application.Customer.Profile.DTOs;
using Application.Customer.Profile.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers.Customer
{
    [Authorize("customer")]
    [Route("api/customer/profile")]
    public class CustomerProfileController:ApiBaseController
    {
        [HttpGet("info")]
        public Task<CustomerEditProfileDTo> GetCustomerProfileInfo()
        {
            return Mediator.Send(new GetCustomerProfileQuery());
        }
        [HttpPut("info")]
        public Task<string> SetCustomerProfileInfo([FromForm]CustomerEditProfileCommand request)
        {
            return Mediator.Send(request);
        }
        [HttpPut("changePassword")]
        public Task ChangePassword([FromForm]CustomerChangePasswordCommand request)
        {
            return Mediator.Send(request);
        }
        [HttpPost("changeProfile")]
        public Task<string> ChangeProfile([FromForm]CustomerProfileChangePhotoCommand request)
        {
            return Mediator.Send(request);
        }
    }
}