using System;
using System.Linq;
using Application.Common.Statics;
using Application.Company.Agencies.DTOs;
using Application.Company.Employees.Commands.CreateEmployees;
using Application.Company.Employees.Commands.EditEmployees;
using Application.Company.Employees.DTOs;
using Application.Countries.DTOs;
using Application.Customer.CustomerAccounts.Commands.CreateAccountRate;
using Application.Customer.CustomerAccounts.Commands.Transactions.CreateTransaction;
using Application.Customer.CustomerAccounts.DTOs;
using Application.Customer.ExchangeRates.Commands.UpdateExchangeRate;
using Application.Customer.ExchangeRates.DTos;
using Application.Customer.Friend.DTOs;
using Application.Customer.Notifications.DTOs;
using Application.Customer.Profile.Commands.EditProfile;
using Application.Customer.Profile.DTOs;
using Application.Customer.Transfers.Commands.CreateTransfer;
using Application.Customer.Transfers.Commands.EditTransfer;
using Application.Customer.Transfers.DTOs;
using Application.SubCustomers.Commands.CreateAccountRate;
using Application.SubCustomers.Commands.CreateSubCustomerAccount;
using Application.SubCustomers.Commands.CreateTransfer;
using Application.SubCustomers.Commands.EditAccountRate;
using Application.SubCustomers.Commands.EditSubCustomerAccount;
using Application.SubCustomers.Commands.EditTransfer;
using Application.SubCustomers.Commands.Transactions.CreateTransaction;
using Application.SubCustomers.DTOs;
using Application.SubCustomers.Statics;
using Application.SunriseSuperAdmin.Customers.DTOs;
using Application.SunriseSuperAdmin.Rates.Commands.CreateRate;
using Application.SunriseSuperAdmin.Rates.Commands.UpdateRate;
using Application.SunriseSuperAdmin.Rates.DTos;
using Application.Website.Customers.Auth.Command.CreateCustomer;
using Application.Website.Customers.Auth.Command.CreateCustomerCompany;
using AutoMapper;
using Domain.Entities;

namespace Application.Common.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            #region Customer

            CreateMap<Domain.Entities.Customer, SearchOtherCustomerDTo>();
            CreateMap<Domain.Entities.Customer, FriendProfileDTo>();
            CreateMap<Domain.Entities.Customer, EmployeeTableDTo>();
            CreateMap<CreateCustomerCommand, Domain.Entities.Customer>();
            CreateMap<CreateCustomerCompanyCommand, Domain.Entities.Customer>();
            CreateMap<CreateEmployeeCommand, Domain.Entities.Customer>();
            CreateMap<EditEmployeeCommand, Domain.Entities.Customer>();
            CreateMap<Domain.Entities.Customer,EditEmployeeDTo>();
            CreateMap<Domain.Entities.Customer,MCustomerTableDTo>().ReverseMap();
            // CreateMap<CreateUserCommand, Customer>().ReverseMap();

            #endregion

            // #region packages
            //
            // CreateMap<PackageDto, Package>().ReverseMap();
            //
            // #endregion
            //

            #region RatesCountry

            CreateMap<CreateRateCommand, RatesCountry>();
            CreateMap<UpdateRateCommand, RatesCountry>();
            CreateMap<RateDTo, RatesCountry>().ReverseMap();

            #endregion

            #region customerExchangeRate

            CreateMap<CustomerExchangeRate, CustomerExchangeRatesListDTo>();
            CreateMap<UpdateExchangeRateCommand, CustomerExchangeRate>();
            CreateMap<CustomerExchangeRate, ExchangeRatesDTo>();
            CreateMap<CustomerExchangeRate, CustomerExchangeRateEditDTo>();

            #endregion

            #region Country

            CreateMap<Country, CountryListDTo>();

            #endregion

            #region friends

            CreateMap<Friend, FriendsListDTo>()
                .ForMember(dist=>dist.IsEmployee,option=>
                    option.MapFrom(source=>source.CustomerFriend.UserType==UserTypes.EmployeeType));
            CreateMap<Friend, FriendRequestDTo>();
            CreateMap<Friend, SearchFriendDTo>();

            #endregion

            #region Transfer

            CreateMap<CreateTransferCommand, Transfer>().ReverseMap();
            CreateMap<SubCustomerCreateTransferCommand, Transfer>().ReverseMap();
            CreateMap<SubCustomerEditTransferCommand, Transfer>().ReverseMap();
            CreateMap<Transfer, TransferInboxTableDTo>();
            CreateMap<Transfer, TransferOutboxTableDTo>();
            CreateMap<Transfer, TransferInboxDetailDTo>();
            CreateMap<Transfer, TransferOutboxDetailDTo>();
            CreateMap<EditTransferCommand, Transfer>();
            CreateMap<Transfer, EditTransferDTo>()
                .ForMember(dist => dist.Amount, option =>
                    option.MapFrom(source => source.SourceAmount));
            CreateMap<Transfer, SubCustomerEditTransferDTo>()
                .ForMember(dist => dist.Amount, option =>
                    option.MapFrom(source => source.SourceAmount));
            #endregion

            #region CustomerNotifications

            CreateMap<CustomerNotification, CustomerNotificationDTo>()
                .ForMember(dist => dist.Date, option =>
                    option.MapFrom(source => source.CreatedDate));

            #endregion

            #region SubCustomer

            CreateMap<SubCustomerAccount, SubCustomerTableDTo>()
                .ForMember(dist=>dist.TotalRatesAccounts,option=>
                    option.MapFrom(source=>source.SubCustomerAccountRates.Count()));
            CreateMap<SubCustomerAccount, SubCustomerEditDTo>();
            CreateMap<CreateSubCustomerCommand, SubCustomerAccount>();
            CreateMap<EditSubCustomerCommand, SubCustomerAccount>();
           
            CreateMap<SubCustomerAccount,SubCustomerAccountDTo>();
            CreateMap<SubCustomerAccount,SubCustomerAccountDropdownListDTo>();

            #endregion
            #region CustomerAccountRate
            
            CreateMap<CustomerAccount,CustomerAccountRateDTo>()
                .ForMember(dist=>dist.PriceName,option=>
                    option.MapFrom(source=>source.RatesCountry.PriceName));
            CreateMap<CreateCustomerAccountRateCommand,CustomerAccount>();
            CreateMap<CreateCustomerTransactionCommand,CustomerAccountTransaction>();
            CreateMap<CustomerAccountTransaction,CustomerAccountTransactionDTo>()
                .ForMember(dist=>dist.CanRollback,option=>
                    option.MapFrom(source=>
                        source.TransactionType!=TransactionTypes.Transfer &&
                        source.TransactionType!=TransactionTypes.ReceivedFromAccount &&
                        source.CreatedDate.Value.Date>=DateTime.UtcNow.AddDays(-2).Date));
            // CreateMap<CustomerAccount,EditCustomerAccountRateDTo>();
            #endregion
            #region SubCustomerAccountRate
            
            CreateMap<SubCustomerAccountRate,SubCustomerAccountRateDTo>()
                .ForMember(dist=>dist.PriceName,option=>
                    option.MapFrom(source=>source.RatesCountry.PriceName));
            CreateMap<CreateAccountRateCommand,SubCustomerAccountRate>();
            CreateMap<EditAccountRateCommand,SubCustomerAccountRate>();
            CreateMap<SubCustomerAccountRate,EditSubCustomerAccountRateDTo>();

            #endregion

            #region SubCustomerTransaction
            CreateMap<SubCustomerTransaction,SubCustomerTransactionDTo>()
                .ForMember(dist=>dist.CanRollback,option=>
                    option.MapFrom(source=>
                        source.TransactionType!=TransactionTypes.Transfer &&
                        source.TransactionType!=TransactionTypes.TransferWithDebt &&
                        source.TransactionType!=TransactionTypes.ReceivedFromAccount &&
                        source.CreatedDate.Value.Date>=DateTime.UtcNow.AddDays(-2).Date));
            CreateMap<CreateTransactionCommand, SubCustomerTransaction>();

            #endregion

            #region CompanyAgency

            CreateMap<CompanyAgency,AgenciesSelectDTo>();
            CreateMap<CompanyAgency,AgencyEditDTo>();
            CreateMap<CompanyAgency, AgenciesTableDto>()
                .ForMember(dist=>dist.TotalEmployees,option=>
                    option.MapFrom(source=>source.Customers.Count() ));
            #endregion
            #region customerProfile

            CreateMap<Domain.Entities.Customer, CustomerEditProfileDTo>();
            CreateMap<CustomerEditProfileCommand, Domain.Entities.Customer>();

            #endregion
        }
    }
}