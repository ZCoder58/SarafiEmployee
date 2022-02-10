using System;

namespace Application.Common.Exceptions
{
    public class UnAuthorizedException:Exception
    {
        public UnAuthorizedException():base("access denied")
        {
                
        }
    }
}