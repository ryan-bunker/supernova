using System;
using System.Collections.Generic;

namespace SupernovaApi
{
    public static class GeneralExtensions
    {
        private static readonly string[][] _romanDigits =
        {
            new []{"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"},    // units
            new []{"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"},    // tens
            new []{"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"},    // hundreds
            new []{"", "M", "MM", "MMM"}    // thousands
        };
        
        public static string ToRomanNumerals(this int n)
        {
            int place = 0;
            string result = "";
            while (n > 0)
            {
                var digit = _romanDigits[place][n % 10];
                result = digit + result;
                n /= 10;
                place++;
            }

            return result;
        }

        public static T Pick<T>(this Random rand, IReadOnlyList<T> source) => source[rand.Next(source.Count)];
    }
}