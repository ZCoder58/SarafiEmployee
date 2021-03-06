using System;
using Domain.Interfaces;

namespace Domain.Common
{

    public class BaseEntity : IEntity
    {
        public BaseEntity()
        {
            Id= Guid.NewGuid();
        }
        public Guid Id { get; set; } 
        public DateTime? UpdatedDate { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}