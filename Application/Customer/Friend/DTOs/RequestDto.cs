using System;

namespace Application.Customer.Friend.DTOs
{
    public class RequestDto
    {
        public RequestDto()
        {
            RequestId=Guid.Empty;
        }
        public int State { get; set; }
        public Guid RequestId { get; set; }
    }
}