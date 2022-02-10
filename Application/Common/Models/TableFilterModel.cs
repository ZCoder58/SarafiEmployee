using Newtonsoft.Json;

namespace Application.Common.Models
{
    public class TableFilterModel
    {
        [JsonProperty("Page")] public int Page { get; set; }

        [JsonProperty("perPage")] public int PerPage { get; set; }

        [JsonProperty("column")] public string Column { get; set; }

        [JsonProperty("direction")] public string Direction { get; set; }
        [JsonProperty("search")] public string Search { get; set; }
    }
}