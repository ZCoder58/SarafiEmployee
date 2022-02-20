﻿using System;
using Domain.Common;

namespace Domain.Entities
{
    public class CustomerExchangeRate:BaseEntity
    {
        public CustomerExchangeRate()
        {
            FromAmount = 1;
            ToExchangeRate = 1;
        }
        public Guid FromRatesCountryId { get; set; }
        public double FromAmount { get; set; }
        public Guid? ToRatesCountryId { get; set; }
        public double ToExchangeRate { get; set; }
        public RatesCountry FromRatesCountry { get; set; }
        public RatesCountry ToRatesCountry { get; set; }
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }
        public bool Updated { get; set; }
        public bool Reverse { get; set; }
    }
}