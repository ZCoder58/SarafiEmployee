namespace Application.Common.Statics
{
    public static class Crypto
    {
        public static string HashPassword(string value)
        {
            return BCrypt.Net.BCrypt.HashPassword(value);
        }
        public static bool VerifyPassword(string value,string hashed)
        {
            return BCrypt.Net.BCrypt.Verify(value,hashed);
        }
    }
}