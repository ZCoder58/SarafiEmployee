using System;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.SunriseSuperAdmin.Rates.Commands.UpdateRate
{
    public class UpdateRateCommand:IRequest
    {
        public Guid Id { get; set; }
        public string FaName { get; set; }
        public string Abbr { get; set; }
        public string PriceName { get; set; }
        public IFormFile FlagPhotoFile { get; set; }
    }
}