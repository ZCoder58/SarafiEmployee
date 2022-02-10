using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Domain.Common;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Interfaces.IHubs.IAccessors;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class ApplicationDbContext:Microsoft.EntityFrameworkCore.DbContext,IApplicationDbContext
    {
        private readonly IHttpUserContext _httpUserContext;
        private readonly INotifyHubAccessor _notifyHub;
        public ApplicationDbContext(IHttpUserContext httpUserContext, INotifyHubAccessor notifyHub)
        {
            _httpUserContext = httpUserContext;
            _notifyHub = notifyHub;
        }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IHttpUserContext httpUserContext, INotifyHubAccessor notifyHub):base(options)
        {
            _httpUserContext = httpUserContext;
            _notifyHub = notifyHub;
        }


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
                       
                        entry.Entity.CreatedDate = DateTime.Now;
                        break;
                    case EntityState.Modified:
                       
                        entry.Entity.UpdatedDate = DateTime.Now;
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
                        
                        entry.Entity.CreatedDate = DateTime.Now;
                        break;
                    case EntityState.Modified:
                      
                        entry.Entity.UpdatedDate = DateTime.Now;
                        break;

                }
            }
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }
        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     if (!_httpUserContext.GetCurrentUserId().IsNullOrEmpty())
        //     {
        //         modelBuilder.ApplyFilter<ICompanyFilter>(a => a.CompanyId==_httpUserContext.GetCompanyId().ToGuid());
        //     }
        //     base.OnModelCreating(modelBuilder);
        // }

    }
}