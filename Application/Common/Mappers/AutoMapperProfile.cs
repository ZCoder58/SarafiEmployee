using Application.Countries.DTOs;
using Application.Customer.ExchangeRates.Commands.UpdateExchangeRate;
using Application.Customer.ExchangeRates.DTos;
using Application.Customer.Friend.DTOs;
using Application.Customer.Notifications.DTOs;
using Application.Customer.Profile.Commands.EditProfile;
using Application.Customer.Profile.DTOs;
using Application.Customer.Transfers.Commands.CreateTransfer;
using Application.Customer.Transfers.DTOs;
using Application.SunriseSuperAdmin.Customers.DTOs;
using Application.SunriseSuperAdmin.Rates.Commands.CreateRate;
using Application.SunriseSuperAdmin.Rates.Commands.UpdateRate;
using Application.SunriseSuperAdmin.Rates.DTos;
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
            // CreateMap<UserDto, Customer>().ReverseMap();
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
            CreateMap<CustomerExchangeRate,CustomerExchangeRatesListDTo>();
            CreateMap<UpdateExchangeRateCommand,CustomerExchangeRate>();
            CreateMap<CustomerExchangeRate,ExchangeRatesDTo>();
            CreateMap<CustomerExchangeRate,CustomerExchangeRateEditDTo>();
            #endregion
            
            #region Country
            
            CreateMap<Country, CountryListDTo>();
            
            
            #endregion
            #region friends
            
            CreateMap<Friend, FriendsListDTo>();
            CreateMap<Friend, FriendRequestDTo>();
            CreateMap<Friend, SearchFriendDTo>();
            
            
            #endregion
            
            #region Transfer
            
            CreateMap<CreateTransferCommand,Transfer>().ReverseMap();
            CreateMap<Transfer,TransferInboxTableDTo>();
            CreateMap<Transfer,TransferOutboxTableDTo>();
            CreateMap<Transfer,TransferInboxDetailDTo>();
            CreateMap<Transfer,TransferOutboxDetailDTo>();
            #endregion
            
            #region CustomerNotifications
            
            CreateMap<CustomerNotification, CustomerNotificationDTo>()
                .ForMember(dist=>dist.Date,option=>
                    option.MapFrom(source=>source.CreatedDate));
            #endregion
           
            // #region customer dashboard
            //
            // CreateMap<Announcement, CompanyDashboardTodayAnnouncementDTo>();
            //
            // #endregion
            //
            #region customerProfile
            
            CreateMap<Domain.Entities.Customer, CustomerEditProfileDTo>();
            CreateMap<CustomerEditProfileCommand,Domain.Entities.Customer>();
            
            #endregion
        }
    }
}