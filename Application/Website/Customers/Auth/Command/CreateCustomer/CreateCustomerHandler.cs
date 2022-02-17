using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Website.Customers.EventHandlers;
using AutoMapper;
using Domain.Interfaces;
using MediatR;

namespace Application.Website.Customers.Auth.Command.CreateCustomer
{
    public class CreateCustomerHandler:IRequestHandler<CreateCustomerCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public CreateCustomerHandler(IApplicationDbContext dbContext, IMapper mapper, IMediator mediator)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(CreateCustomerCommand request, CancellationToken cancellationToken)
        {
            var newCustomer = _mapper.Map<Domain.Entities.Customer>(request);
            newCustomer.ActivationAccountCode = $"{Guid.NewGuid()}{Guid.NewGuid()}";
            await _dbContext.Customers.AddAsync(newCustomer,cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new CustomerCreated(newCustomer), cancellationToken);
            return Unit.Value;
        }
    }
}