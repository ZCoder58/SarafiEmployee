using System;
using System.Collections.Generic;
using Domain.Common;

namespace Domain.Entities
{
    public class RatesCountry:BaseEntity
    {
        public string FaName { get; set; }
        public string Abbr { get; set; }
        public string FlagPhoto { get; set; }
        public string PriceName { get; set; }
    }
}