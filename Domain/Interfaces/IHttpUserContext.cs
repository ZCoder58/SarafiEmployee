namespace Domain.Interfaces
{
    public interface IHttpUserContext
    {
        string GetCurrentUserId();
        string GetUserType();
        string GetUserName();
        string GetProfilePhoto();
        string GetName();
        string GetLastName();
        string IsPremiumAccount();
        string GetCompanyId();
    }
}
