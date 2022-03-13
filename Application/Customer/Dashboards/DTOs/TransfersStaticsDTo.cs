namespace Application.Customer.Dashboards.DTOs
{
    public class TransfersStaticsDTo
    {
        public int PendingInTransfers { get; set; }
        public int PendingOutTransfers { get; set; }
        public int CompletedInTransfers { get; set; }
        public int CompletedOutTransfers { get; set; }
    }
}