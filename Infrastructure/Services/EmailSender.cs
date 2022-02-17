using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Infrastructure.Models;
using Microsoft.Extensions.Options;
using Domain.Interfaces;
using FluentEmail.Core;
using FluentEmail.Razor;
using FluentEmail.Smtp;

namespace Infrastructure.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly IFluentEmail _email;
        public EmailSender(IFluentEmail email)
        {
            _email = email;
        }


        public async Task SendEmailAsync(string to, string subject, string body)
        {
              await _email
                .To(to)
                .Subject(subject)
                .Body(body)
                .SendAsync();
        }

        public async Task SendEmailAsync(string to, string subject, string templatePath, object model)
        {
            await _email
                .To(to)
                .Subject(subject)
                .UsingTemplateFromFile(templatePath,model)
                .SendAsync();
        }
    }
}