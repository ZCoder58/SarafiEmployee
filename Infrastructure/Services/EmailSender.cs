using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Infrastructure.Models;
using Microsoft.Extensions.Options;
using System.Text;
using Domain.Interfaces;
using FluentEmail.Core;
using FluentEmail.Razor;
using FluentEmail.Smtp;

namespace Infrastructure.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailSettings _emailSettings;

        public EmailSender(IOptions<EmailSettings> optionsAccessor)
        {
            _emailSettings = optionsAccessor.Value;
        }


        public Task SendEmailAsync(string to, string subject, string message)
        {
            return Execute(subject, message, to);
        }

        public async Task Execute(string subject, string message, string to)
        {
           
            var sender = new SmtpSender(()=>
                new SmtpClient(_emailSettings.Host,Int32.Parse(_emailSettings.Port))
                {
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(_emailSettings.Mail, _emailSettings.Password)
                });
            Email.DefaultSender = sender;
              await Email
                .From(_emailSettings.Mail, _emailSettings.DisplayName)
                .To(to)
                .Subject(subject)
                .Body(message,true)
                .SendAsync();
                
        }
    }
}