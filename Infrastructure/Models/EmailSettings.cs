namespace Infrastructure.Models
{
    public class EmailSettings
    {
        public string Secret { get; set; }
        public string Mail { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public string Port { get; set; }
    }
}