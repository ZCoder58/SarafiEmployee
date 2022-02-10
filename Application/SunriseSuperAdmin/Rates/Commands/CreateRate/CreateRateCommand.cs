using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.SunriseSuperAdmin.Rates.Commands.CreateRate
{
    public class CreateRateCommand:IRequest
    {
        public string FaName { get; set; }
        public string Abbr { get; set; }
        public string PriceName { get; set; }
        public IFormFile FlagPhotoFile { get; set; }
    }
}