using System.Collections.Generic;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Application.Common.Behaviours;
using Application.Common.Extensions;
using Application.Common.Hubs;
using Application.Common.Mappers;
using Application.Common.Security;
using Application.Common.Security.AdminUsersManagement;
using Application.Common.Security.Customer;
using Application.Common.Services;
using Application.Common.Services.HubsAccessors;
using Domain.Interfaces.IHubs.IAccessors;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services,IConfiguration configuration )
        {
            #region other
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddAutoMapper(typeof(AutoMapperProfile));
            #endregion
            
            #region fluentValidation
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));
            #endregion
            
            #region Authentication
            var jwtConfig = new JwtConfig();
            services.AddScoped<JwtService>();
            configuration.Bind("JwtConfig", jwtConfig);
            services.AddSingleton(jwtConfig);
            var key = Encoding.ASCII.GetBytes(configuration["JwtConfig:Secret"]);
            var tokenValidationParameters= new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false,
                RequireExpirationTime = false
            };
            services.AddSingleton(tokenValidationParameters);
            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                }
            ).AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, jwtOptions =>
            {
                jwtOptions.SaveToken = true;
                jwtOptions.TokenValidationParameters = tokenValidationParameters;
                jwtOptions.Events = new JwtBearerEvents()
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                      
                        if (!string.IsNullOrEmpty(accessToken))
                        {
                            context.Token = accessToken.ToString();
                        }
                        return Task.CompletedTask;
                    }
                };
            });
            #endregion
            
            #region Authorization

            services.AddHttpContextAccessor();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IAuthorizationHandler, HandleTokenValidationRequirement>();
            services.AddTransient<IAuthorizationHandler, CompanyAuthRequirementHandler>();
            services.AddTransient<IAuthorizationHandler, CustomerAuthRequirementLimitFriendsForSimpleCustomerHandler>();
            services.AddTransient<IAuthorizationHandler, CustomerAuthRequirementSimpleHandler>();
            services.AddTransient<IAuthorizationHandler, AdminUserAuthRequirementHandler>();
            services.AddAuthorization(options =>
            {
                options.AddPolicy("tokenValidation", policy => policy.AddRequirements(new TokenValidationRequirement()));
                options.DefaultPolicy =options.GetPolicy("tokenValidation");
                options.AddPolicy("company", policy =>
                {
                    policy.AddRequirements(new CompanyAuthRequirement());
                });
                options.AddPolicy("limitRequest", policy =>
                {
                    policy.AddRequirements(new CustomerAuthRequirementLimitFriendsForSimpleCustomer(1));
                });
                
                options.AddPolicy("customerSimple", policy =>
                {
                    policy.AddRequirements(new CustomerAuthRequirementSimple());
                });
                options.AddPolicy("management", policy =>
                {
                    policy.AddRequirements(new AdminUserAuthRequirement());
                }); 
                
            });

            #endregion
            
            #region signalR
            services.AddSignalR();
            services.AddSingleton<IUserIdProvider, SignalrUserProvider>();
            #endregion

            #region hubsAccessors
            services.AddScoped<INotifyHubAccessor, NotifyHubAccessor>();
            #endregion
            return services;
        }

       
    }
}