using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace Application.SunriseSuperAdmin.Customers.Queries
{
    public class SendEmailQuery:IRequest<Unit>
    {
        
    }
    public class SendEmailHandler:IRequestHandler<SendEmailQuery,Unit>
    {
        private readonly IMediator _mediator;

        public SendEmailHandler(IMediator mediator)
        {
            _mediator = mediator;
        }

        public Task<Unit> Handle(SendEmailQuery request, CancellationToken cancellationToken)
        {
            // _mediator.Publish(new UserAddedEvent(), cancellationToken);
            return Task.FromResult(Unit.Value);
        }
    }
}