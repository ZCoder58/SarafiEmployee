using System;
using System.Collections.Generic;
using Application.Common.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using ValidationException = Application.Common.Exceptions.ValidationException;

namespace Web.Filters
{
    public class ApiExceptionFilters : ExceptionFilterAttribute
    {
        private readonly IDictionary<Type, Action<ExceptionContext>> _exceptionsHandlers;

        public ApiExceptionFilters()
        {
            _exceptionsHandlers = new Dictionary<Type, Action<ExceptionContext>>
            {
                {typeof(ValidationException), HandleValidationException},
                {typeof(RefreshTokenValidationException),HandelRefreshTokenValidationException},
                {typeof(EntityNotFoundException),HandleEntityNotFoundException},
                {typeof(UnAuthorizedException),HandleUnAuthorizedException}

                //add more exception filters here
            };
        }

        public override void OnException(ExceptionContext context)
        {
            Type type = context.Exception.GetType();
            if (_exceptionsHandlers.ContainsKey(type))
            {
                _exceptionsHandlers[type].Invoke(context);
                return;
            }
            if (!context.ModelState.IsValid)
            {
                HandleInvalidModelStateException(context);
                return;
            }

            HandleUnknownException(context);
        }

        public void HandleValidationException(ExceptionContext context)
        {
            var exception = (ValidationException) context.Exception;
            context.Result = new BadRequestObjectResult(JsonConvert.SerializeObject(exception.Errors,
                new JsonSerializerSettings {ContractResolver = new CamelCasePropertyNamesContractResolver()}));
            context.ExceptionHandled = true;
        }
        public void HandleEntityNotFoundException(ExceptionContext context)
        {
            var exception = (ValidationException) context.Exception;
            context.Result = new BadRequestObjectResult(exception.Message);
            context.ExceptionHandled = true;
        } 
        public void HandleUnAuthorizedException(ExceptionContext context)
        {
            var exception =context.Exception;
            var detail = new ProblemDetails()
            {
                Status = 401,
                Title = "UnAuthorized",
                Detail = exception.Message
            };
            context.Result = new ObjectResult(detail);
            context.ExceptionHandled = true;
        }
        public void HandelRefreshTokenValidationException(ExceptionContext context)
        {
            var exception =context.Exception;
            var detail = new ProblemDetails()
            {
                Status = 401,
                Title = "UnAuthorized",
                Detail = exception.Message
            };
            context.Result = new ObjectResult(detail);
            context.ExceptionHandled = true;
        }
        private void HandleInvalidModelStateException(ExceptionContext context)
        {
            var details = new ValidationProblemDetails(context.ModelState)
            {
                Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1"
            };

            context.Result = new BadRequestObjectResult(details);

            context.ExceptionHandled = true;
        }
        private void HandleUnknownException(ExceptionContext context)
        {
            var details = new ProblemDetails
            {
                Status = StatusCodes.Status500InternalServerError,
                Title = "An error occurred while processing your request.",
                Detail = context.Exception.Message,
                Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1"
            };
            
            context.Result = new ObjectResult(details)
            {
                StatusCode = StatusCodes.Status500InternalServerError
            };
            
            context.ExceptionHandled = true;
        }
    }
}