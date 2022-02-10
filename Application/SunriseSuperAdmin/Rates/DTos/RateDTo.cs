using System;
using Newtonsoft.Json;

namespace Application.SunriseSuperAdmin.Rates.DTos
{
    public class RateDTo
    {
        [JsonProperty("id")] public Guid Id { get; set; }
        [JsonProperty("fName")]public string FaName { get; set; }
        [JsonProperty("priceName")]public string PriceName { get; set; }
        [JsonProperty("abbr")]public string Abbr { get; set; }
        [JsonProperty("flagPhoto")]public string FlagPhoto { get; set; }
    }
}