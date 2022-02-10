using System.Collections.Generic;

namespace Infrastructure.Models.CurrencyExchangeApi
{
    public class ConvertModel
    {
        public string Base { get; set; }
        public string Amount { get; set; }
        public IDictionary<string,string> Result { get; set; }
        public string Ms { get; set; }
    }

}