using System;

namespace Application.Common.Exceptions
{
    public class EntityNotFoundException:Exception
    {
        public EntityNotFoundException():base("مدل درخواست شده پیدا نشد")
        {
            
        }
    }
}