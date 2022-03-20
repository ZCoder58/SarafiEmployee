namespace Application.Customer.Transfers.DTOs
{
    public class TransferInReportDTo
    {
        public string CurrencyName { get; set; }
        public string TotalAmount { get; set; }
        public int TotalTransfers { get; set; }
        public double TotalFee { get; set; }
        
    }
}