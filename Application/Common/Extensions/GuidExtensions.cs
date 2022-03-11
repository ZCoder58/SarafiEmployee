using System;

namespace Application.Common.Extensions
{
    public static class GuidExtensions
    {
        public static Guid ToGuid(this Guid? nullableGuid)
        {
            return Guid.Parse(nullableGuid.ToString());
        }

        public static bool IsNotEmptyGuid(this Guid guid)
        {
            return guid!=Guid.Empty;
        }
        public static bool IsEmptyGuid(this Guid guid)
        {
            return guid==Guid.Empty;
        }
        public static bool IsNotEmptyGuid(this Guid? guid)
        {
            return guid!=Guid.Empty;
        }
        public static bool IsEmptyGuid(this Guid? guid)
        {
            return guid==Guid.Empty;
        }
        public static bool IsEmptyOrNullGuid(this Guid? guid)
        {
            return guid==Guid.Empty || guid==null;
        }
    }
}