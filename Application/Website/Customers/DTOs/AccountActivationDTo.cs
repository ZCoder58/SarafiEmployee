namespace Application.Website.Customers.DTOs
{
    public class AccountActivationDTo
    {
        public bool Success { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}