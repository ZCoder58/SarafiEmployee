using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Statics;
using Application.Customer.Friend.Commands.CreateFriendRequest;
using AutoMapper;
using Domain.Interfaces;
using MediatR;

namespace Application.Company.Employees.Commands.CreateEmployees
{
    public class CreateCustomerHandler:IRequestHandler<CreateEmployeeCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly IHttpUserContext _httpUserContext;
        public CreateCustomerHandler(IApplicationDbContext dbContext, IMapper mapper, IMediator mediator, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
        {
            var newCustomer = _mapper.Map<Domain.Entities.Customer>(request);
            newCustomer.UserType = UserTypes.EmployeeType;
            newCustomer.IsEmailVerified = true;
            newCustomer.IsActive = true;
            newCustomer.IsPremiumAccount = true;
            newCustomer.CompanyId = _httpUserContext.GetCompanyId().ToGuid();
            if (request.Photo.IsNotNull())
            {
                newCustomer.Photo=await request.Photo.SaveToAsync(CustomerStatics.PhotoSavePath(newCustomer.Id));
            }
            await _dbContext.Customers.AddAsync(newCustomer,cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Send(new CreateFriendRequestCommand(
                _httpUserContext.GetCurrentUserId().ToGuid(),
                newCustomer.Id,
                true,
                true,
                FriendRequestStates.Approved,
                FriendRequestStates.Approved), cancellationToken);
            return Unit.Value;
        }
    }
}