using System;

namespace Application.Company.Agencies.DTOs
{
    public class AgenciesTableDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int TotalEmployees { get; set; }
    }
}