namespace Application.Common.Models.CurrencyExchange
{
    public class ConvertCurrencyAndReverseResult
    {
        public string SourceName { get; set; }
        public double SourceRate { get; set; }
        public string DestinationName { get; set; }
        public double DestinationRate { get; set; }
        public double DestinationAmount { get; set; }
        public double SourceAmount { get; set; }
    }
}