using System;
using System.Collections;
using System.Collections.Generic;
using Domain.Common;
using Domain.Interfaces;

namespace Domain.Entities
{
    public class Customer:BaseEntity,IAuthUser
    {
      
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public string Photo { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string City { get; set; }
        public string DetailedAddress { get; set; }
        public bool IsEmailVerified { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
        public bool IsPremiumAccount { get; set; }
        public string ActivationAccountCode { get; set; }
        public Guid CountryId { get; set; }
        public Country Country { get; set; }
    }
}