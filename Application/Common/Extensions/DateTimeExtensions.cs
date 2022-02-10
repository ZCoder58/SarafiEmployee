using System;

namespace Application.Common.Extensions
{
    public static class DateTimeExtensions
    {
        public static bool IsGreaterThanDate(this DateTime date,DateTime targetDate)
        {
            return date.Date > targetDate.Date;
        }
        public static bool IsLessThanDate(this DateTime date,DateTime targetDate)
        {
            return date.Date < targetDate.Date;
        }
        public static bool IsLessThanOrEqualDate(this DateTime date,DateTime targetDate)
        {
            return date.Date <= targetDate.Date;
        }
        public static bool IsBetweenDate(this DateTime date,DateTime startDate,DateTime endDate)
        {
            return date.Date>=startDate.Date && date.Date<=endDate.Date;
        }
        public static bool IsGreaterThanOrEqualDate(this DateTime date,DateTime targetDate)
        {
            return date.Date >= targetDate.Date;
        }
    }
}