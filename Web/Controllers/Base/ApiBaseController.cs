using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Web.Controllers.Base
{
    [ApiController]
    public class ApiBaseController : ControllerBase
    {
        private  IMediator _mediator=null;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<IMediator>();
    }
}