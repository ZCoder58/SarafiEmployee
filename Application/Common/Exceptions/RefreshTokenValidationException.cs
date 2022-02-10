using System;

namespace Application.Common.Exceptions
{
    public class RefreshTokenValidationException:Exception
    {
        public RefreshTokenValidationException(string message):base(message)
        {
            
        }
    }
}