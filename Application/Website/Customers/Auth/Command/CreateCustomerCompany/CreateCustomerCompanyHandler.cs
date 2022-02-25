using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Statics;
using Application.Company.Company.Commands.CreateCompany;
using Application.Website.Customers.EventHandlers;
using AutoMapper;
using Domain.Interfaces;
using MediatR;

namespace Application.Website.Customers.Auth.Command.CreateCustomerCompany
{
    public class CreateCustomerCompanyHandler:IRequestHandler<CreateCustomerCompanyCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public CreateCustomerCompanyHandler(IApplicationDbContext dbContext, IMapper mapper, IMediator mediator)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(CreateCustomerCompanyCommand request, CancellationToken cancellationToken)
        {
            var newCustomer = _mapper.Map<Domain.Entities.Customer>(request);
            newCustomer.ActivationAccountCode = $"{Guid.NewGuid()}{Guid.NewGuid()}";
            newCustomer.UserType = UserTypes.CompanyType;
            var newCompanyId=await _mediator.Send(new CreateCompanyCommand()
            {
                Companyname = request.CompanyName
            },cancellationToken);
            newCustomer.CompanyId = newCompanyId;
            await _dbContext.Customers.AddAsync(newCustomer,cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new CustomerCreated(newCustomer), cancellationToken);
            return Unit.Value;
        }
    }
}