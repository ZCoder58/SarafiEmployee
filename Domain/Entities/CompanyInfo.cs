using System;
using Domain.Common;

namespace Domain.Entities
{
    public class CompanyInfo:BaseEntity
    {
        public string CompanyName { get; set; }
        public string About { get; set; }
        public Guid EmployeeSettingId { get; set; }
        public EmployeeSetting EmployeeSetting { get; set; }
    }
}