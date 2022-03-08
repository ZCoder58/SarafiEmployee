using System;
using System.Threading;
using System.Threading.Tasks;
using Domain.Common;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class ApplicationDbContext:Microsoft.EntityFrameworkCore.DbContext,IApplicationDbContext
    {
      
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {
        }

        public DbSet<CustomerAccountTransaction> CustomerAccountTransactions { get; set; }
        public DbSet<CompanyAgency> CompanyAgencies { get; set; }
        public DbSet<CompanyInfo> CompaniesInfos { get; set; }
        public DbSet<EmployeeSetting> EmployeeSettings { get; set; }
        public DbSet<SubCustomerTransaction> SubCustomerTransactions { get; set; }
        public DbSet<CustomerAccount> CustomerAccounts { get; set; }
        public DbSet<SubCustomerAccountRate> SubCustomerAccountRates { get; set; }
        public DbSet<SubCustomerAccount> SubCustomerAccounts { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<RatesCountry> RatesCountries { get; set; }
        public DbSet<AdminUser> AdminUsers { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<CustomerNotification> CustomerNotifications { get; set; }
        public DbSet<Friend> Friends { get; set; }
        public DbSet<CustomerExchangeRate> CustomerExchangeRates { get; set; }
        public DbSet<Transfer> Transfers { get; set; }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<BaseEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                       
                        entry.Entity.CreatedDate = DateTime.UtcNow;
                        break;
                    case EntityState.Modified:
                       
                        entry.Entity.UpdatedDate = DateTime.UtcNow;
                        break;
                }
            }
            return await base.SaveChangesAsync(cancellationToken);
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            foreach (var entry in ChangeTracker.Entries<BaseEntity>())
            {
                switch (entry.State)
                {
                   
                    case EntityState.Added:
                        
                        entry.Entity.CreatedDate = DateTime.UtcNow;
                        break;
                    case EntityState.Modified:
                      
                        entry.Entity.UpdatedDate = DateTime.UtcNow;
                        break;

                }
            }
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // if (!_httpUserContext.GetCurrentUserId().IsNullOrEmpty())
            // {
            //     modelBuilder.ApplyFilter<ICompanyFilter>(a => a.CompanyId==_httpUserContext.GetCompanyId().ToGuid());
            // }
            modelBuilder.Entity<SubCustomerAccountRate>().HasMany(a=>a.SubCustomerTransactions)
                .WithOne(a=>a.SubCustomerAccountRate);
            base.OnModelCreating(modelBuilder);
        }

    }
}