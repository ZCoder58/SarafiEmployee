using System.Net;
using System.Net.Mail;
using Application.Common.Interfaces;
using Domain.Interfaces;
using Infrastructure.Models;
using Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Org.BouncyCastle.Utilities;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services,IConfiguration configuration)
        {
            #region emailSender

            services.AddHttpClient();
            services
                .AddFluentEmail(configuration["AppSettings:Mail"])
                .AddRazorRenderer()
                .AddSmtpSender(new SmtpClient(configuration["AppSettings:Host"],int.Parse(configuration["AppSettings:Port"]))
                {
                    Credentials = new NetworkCredential(configuration["AppSettings:Mail"], configuration["AppSettings:Password"]),
                    EnableSsl = false,
                    DeliveryMethod = SmtpDeliveryMethod.Network, 
                    UseDefaultCredentials = false
                });
            services.AddScoped<IEmailSender, EmailSender>();

            #endregion
           
            services.AddScoped<ICurrencyExchangeService, CurrencyExchangeService>();
            return services;
        }
    }
}