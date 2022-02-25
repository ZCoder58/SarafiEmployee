using System;
using Domain.Common;

namespace Domain.Entities
{
    public class EmployeeSetting:BaseEntity
    {
        public bool CanBeFriendWithOthers { get; set; }
       
    }
}