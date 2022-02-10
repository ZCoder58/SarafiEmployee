using System;
using System.Collections.Generic;
using System.Linq;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Application.Common.Exceptions
{
    public class ValidationException : Exception
    {
        public ValidationException()
            : base("یک یا چندین فیلد ضروری میباشد")
        {
            Errors = new Dictionary<string, string[]>();
        }

        public ValidationException(IEnumerable<ValidationFailure> failures): this()
        {
            Errors = failures
                .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
                .ToDictionary(failureGroup => failureGroup.Key, failureGroup => failureGroup.ToArray());
        }
        public ValidationException(string key,string[] value): this()
        {
            
            Errors.Add(key,value);
        }

        public IDictionary<string, string[]> Errors { get; }
    }
}