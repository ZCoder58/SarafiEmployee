using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.SubCustomers.Commands.EditSubCustomerAccount;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.SubCustomers.Commands.EditSubCustomerAccount
{
    public class EditSubCustomerHandler:IRequestHandler<EditSubCustomerCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public EditSubCustomerHandler(IApplicationDbContext dbContext, IMapper mapper, IMediator mediator, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(EditSubCustomerCommand request, CancellationToken cancellationToken)
        {
            var targetSubCustomer = _dbContext.SubCustomerAccounts.GetById(request.Id);
             _mapper.Map(request,targetSubCustomer);
             await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}