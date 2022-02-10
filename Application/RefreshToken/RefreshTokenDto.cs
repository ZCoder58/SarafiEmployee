using Newtonsoft.Json;

namespace Application.RefreshToken
{
    public class RefreshTokenDto
    {
        public RefreshTokenDto()
        {
            IsSuccess = false;
        }
        [JsonProperty("token")]
        public string Token { get; set; }

        [JsonProperty("isSuccess")]
        public bool IsSuccess { get; set; }
        
    }
}