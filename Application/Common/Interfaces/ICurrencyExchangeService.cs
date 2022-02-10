using System.Threading.Tasks;
using Application.Common.Models.CurrencyExchange;
namespace Application.Common.Interfaces
{
    public interface ICurrencyExchangeService
    {
        Task<ConvertCurrencyAndReverseResult> ConvertCurrencyAndReverseAsync(string source, string destination, double amount);
        Task<double> GetExchangeRateAsync(string source, string destination);
        Task<double> ConvertCurrencyAsync(string source, string destination,double amount);
    }
}