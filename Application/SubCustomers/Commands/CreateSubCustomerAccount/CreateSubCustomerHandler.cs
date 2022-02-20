using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.SubCustomers.Commands.CreateSubCustomerAccount
{
    public class CreateSubCustomerHandler:IRequestHandler<CreateSubCustomerCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public CreateSubCustomerHandler(IApplicationDbContext dbContext, IMapper mapper, IMediator mediator, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(CreateSubCustomerCommand request, CancellationToken cancellationToken)
        {
            var newSubCustomer = _mapper.Map<SubCustomerAccount>(request);
            newSubCustomer.CustomerId = _httpUserContext.GetCurrentUserId().ToGuid();
            await _dbContext.SubCustomerAccounts.AddAsync(newSubCustomer, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}