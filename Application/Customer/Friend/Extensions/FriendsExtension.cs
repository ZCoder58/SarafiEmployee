using System;
using System.Linq;
using Application.Common.Extensions;

namespace Application.Customer.Friend.Extensions
{
    public static class FriendsExtension
    {
        public static bool IsCustomersFriend(this IQueryable<Domain.Entities.Friend> friends,Guid whoCustomerId,Guid withCustomerId)
        {
            var result= friends.Any(a =>
                (a.CustomerId == whoCustomerId &&
                 a.CustomerFriendId==withCustomerId) ||
                (a.CustomerId == withCustomerId &&
                 a.CustomerFriendId == whoCustomerId));
            return result;
        }
        public static bool IsRequestSentToCustomer(this IQueryable<Domain.Entities.Friend> friends,Guid friendId,Guid customerId)
        {
            var result= friends.Any(a =>
                a.Id==friendId &&
                 a.CustomerFriendId == customerId &&
                !a.CustomerFriendApproved);
            return result;
        }
   
        public static Domain.Entities.Friend GetFriendRequest(this IQueryable<Domain.Entities.Friend> friends,Guid whoCustomerId,Guid withCustomerId)
        {
            return friends.FirstOrDefault(a =>
                a.CustomerId == whoCustomerId &&
                 a.CustomerFriendId==withCustomerId);
        }
     
        public static bool IsFriendRequestApproved(this IQueryable<Domain.Entities.Friend> friends,Guid friendId)
        {
            return friends.Any(a =>a.Id==friendId &&
                a.CustomerFriendApproved);
        }
        public static bool IsFriendsAlready(this IQueryable<Domain.Entities.Friend> friends,Guid whoCustomerId,Guid withCustomerId)
        {
            return friends.Any(a =>
                a.CustomerId == whoCustomerId &&
                a.CustomerFriendId==withCustomerId);
        }
        public static bool IsApprovedFriendsAlready(this IQueryable<Domain.Entities.Friend> friends,Guid whoCustomerId,Guid withCustomerId)
        {
            return friends.Any(a =>
                a.CustomerId == whoCustomerId &&
                a.CustomerFriendApproved &&
                a.CustomerFriendId==withCustomerId);
        }
        public static bool IsCustomerApprovedFriend(this IQueryable<Domain.Entities.Friend> friends,Guid customerId,Guid friendId)
        {
            return friends.Any(a =>
                a.CustomerId == customerId &&
                a.CustomerFriendApproved &&
                a.Id==friendId);
        }
        
        ////////////////////////////////////
        
        
        public static bool IsNotFriends(this IQueryable<Domain.Entities.Friend> friends,Guid who,Guid with)
        {
            return !friends.Any(a =>
                a.CustomerId == who &&
                a.CustomerFriendId==with);
        }
        public static bool IsNotApprovedRequest(this IQueryable<Domain.Entities.Friend> friends,Guid who,Guid with)
        {
            return !friends.Any(a =>
                a.CustomerId == who &&
                a.CustomerFriendApproved &&
                a.CustomerFriendId==with);
        }
    }
}