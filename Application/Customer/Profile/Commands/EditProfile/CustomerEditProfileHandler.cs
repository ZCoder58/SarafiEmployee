using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Security;
using Application.Common.Statics;
using Application.Customer.Profile.EventHandlers;
using AutoMapper;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Profile.Commands.EditProfile
{
    public class CustomerEditProfileHandler : IRequestHandler<CustomerEditProfileCommand, string>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly JwtService _jwtService;

        public CustomerEditProfileHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext,
            IMapper mapper, IMediator mediator, JwtService jwtService)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _mapper = mapper;
            _mediator = mediator;
            _jwtService = jwtService;
        }

        public async Task<string> Handle(CustomerEditProfileCommand request, CancellationToken cancellationToken)
        {
            var targetEmployee = _dbContext.Customers.GetById(_httpUserContext.GetCurrentUserId().ToGuid());
            _mapper.Map(request, targetEmployee);
            await _dbContext.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new CustomerProfileUpdated(), cancellationToken);
            var newToken = _jwtService.GenerateToken(
                targetEmployee.UserName,
                _httpUserContext.GetCurrentUserId().ToGuid(),
                UserTypes.CustomerType,
                CustomerStatics.DefaultCustomerClaim(
                    _httpUserContext.GetProfilePhoto(),
                    _httpUserContext.GetName(),
                    _httpUserContext.GetLastName(),
                    _httpUserContext.IsPremiumAccount()));
            return newToken;
        }
    }
}