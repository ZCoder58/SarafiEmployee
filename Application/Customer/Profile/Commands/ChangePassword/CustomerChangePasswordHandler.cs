using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Customer.Profile.EventHandlers;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Profile.Commands.ChangePassword
{
    public class CustomerChangePasswordHandler:IRequestHandler<CustomerChangePasswordCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMediator _mediator;
        private readonly IHttpUserContext _httpUserContext;
        public CustomerChangePasswordHandler(IApplicationDbContext dbContext, IMediator mediator, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(CustomerChangePasswordCommand request, CancellationToken cancellationToken)
        {
            var targetCustomer = _dbContext.Customers.GetById(_httpUserContext.GetCurrentUserId().ToGuid());
            targetCustomer.Password = request.NewPassword;
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new CustomerPasswordUpdated(), cancellationToken);
            return Unit.Value;
        }
    }
}