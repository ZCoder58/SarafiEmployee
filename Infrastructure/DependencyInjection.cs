using Application.Common.Interfaces;
using Domain.Interfaces;
using Infrastructure.Models;
using Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services,IConfiguration configuration)
        {
            #region emailSender

            services.AddHttpClient();
            services.Configure<EmailSettings>(configuration.GetSection("AppSettings"));
            configuration.Bind("AppSettings", new EmailSettings());
            services.AddScoped<IEmailSender, EmailSender>();

            #endregion
           
            services.AddScoped<ICurrencyExchangeService, CurrencyExchangeService>();
            return services;
        }
    }
}