using System;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Application.Common.Extensions
{
    public static  class StringExtensions
    {
        public static string ToBase64Encode(this string textToEncode)
        {
            byte[] textAsBytes = Encoding.UTF8.GetBytes(textToEncode);
            return Convert.ToBase64String(textAsBytes);
        }
        public static string ToEmptyStringIfNull(this string str)
        {
            return str.IsNullOrEmpty()?"":str;
        } 
        public static double ToDouble(this string doubleStr)
        {
            return Double.Parse(doubleStr);
        } 
        /// <summary>
        /// get string and return a double
        /// number of precision specify with # symbol 
        /// </summary>
        /// <param name="doubleStr">string double</param>
        /// <returns>formatted double with 5 number of precision eg:
        /// original:67.234234234234
        /// out :67.23423
        /// </returns>
        public static double ToDoubleFormatted(this string doubleStr)
        {
            var doubleNumber = Double.Parse(doubleStr);
            doubleStr = String.Format("{0:0.#######}", doubleNumber);

            return  Double.Parse(doubleStr);
        }
       
        public static Guid ToGuid(this string value)
        {
            return Guid.Parse(value);
        }
        public static bool IsValidHexColor(this string colorString)
        {
            
                // Regex to check valid hexadecimal color code.
                var regex=new Regex("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
 
                // If the hexadecimal color code
                // is empty return false
                if (string.IsNullOrEmpty(colorString))
                {
                    return false;
                }
 
                // Return true if the hexadecimal color code
                // matched the ReGex
                if(regex.IsMatch(colorString))
                {
                    return true;
                }
                else
                {
                    return false;
                }
           
        }
        /// <summary>
        /// gets an email address and extract its userName
        /// eg: afgAhmadi75@gmail.com
        /// result:afgAhmadi75
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public static string GetEmailUserName(this string email)
        {
            return email.Split('@').ElementAt(0);
        }
        public static bool IsNullOrEmpty(this string value)
        {
            return string.IsNullOrEmpty(value);
        }
        public static bool IsNotNullOrEmpty(this string value)
        {
            return !string.IsNullOrEmpty(value);
        }
      
        public static bool IsGuid(this string value)
        {
            return Guid.TryParse(value,out var parsedValue);
        }
        public static bool IsGuid(this string value,out Guid resultGuid)
        {
            return Guid.TryParse(value,out resultGuid);
        }
        
    }
}