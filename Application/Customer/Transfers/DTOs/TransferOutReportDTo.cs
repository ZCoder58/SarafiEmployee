namespace Application.Customer.Transfers.DTOs
{
    public class TransferOutReportDTo
    {
        public string CurrencyName { get; set; }
        public string TotalAmount { get; set; }
        public int TotalTransfers { get; set; }
    }
}