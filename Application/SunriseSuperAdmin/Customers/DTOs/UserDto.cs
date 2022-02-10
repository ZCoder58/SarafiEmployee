using System;
using Newtonsoft.Json;

namespace Application.SunriseSuperAdmin.Customers.DTOs
{
    public class UserDto
    {
        [JsonProperty("id")] public Guid Id { get; set; }

        [JsonProperty("userName")] public string UserName { get; set; }

        [JsonProperty("photo")] public string Photo { get; set; }
    }
}