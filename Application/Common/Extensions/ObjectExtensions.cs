using System;
using System.Collections.Generic;

namespace Application.Common.Extensions
{
    public static class ObjectExtensions
    {
        public static bool IsNotNull<T>(this T obj)
        {
            return obj != null;
        }

        public static bool IsNull<T>(this T obj)
        {
            return obj == null;
        }

        public static bool NotEqualTo<T>(this T obj, T obj2)
        {
            return EqualityComparer<T>.Default.Equals(obj,obj2);
        }
    }
}