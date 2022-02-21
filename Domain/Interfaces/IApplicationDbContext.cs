using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domain.Interfaces
{
    public interface IApplicationDbContext
    {
         DbSet<SubCustomerTransaction> SubCustomerTransactions { get; set; }
         DbSet<CustomerAccount> CustomerAccounts { get; set; }
         DbSet<SubCustomerAccountRate> SubCustomerAccountRates { get; set; }
         DbSet<SubCustomerAccount> SubCustomerAccounts { get; set; }
         DbSet<Customer> Customers { get; set; }
         DbSet<RefreshToken> RefreshTokens { get; set; }
         DbSet<RatesCountry> RatesCountries { get; set; }
         DbSet<AdminUser> AdminUsers { get; set; }
         DbSet<Country> Countries { get; set; }
         DbSet<CustomerNotification> CustomerNotifications { get; set; }
         DbSet<Friend> Friends { get; set; }
         DbSet<CustomerExchangeRate> CustomerExchangeRates { get; set; }
         DbSet<Transfer> Transfers { get; set; }
         Task<int> SaveChangesAsync(CancellationToken cancellationToken);
         int SaveChanges();
    }
}