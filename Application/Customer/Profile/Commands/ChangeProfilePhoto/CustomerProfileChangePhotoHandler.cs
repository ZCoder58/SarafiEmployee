using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Security;
using Application.Common.Statics;
using Application.Customer.Profile.EventHandlers;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Profile.Commands.ChangeProfilePhoto
{
    public class CustomerChangePhotoHandler : IRequestHandler<CustomerProfileChangePhotoCommand, string>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly JwtService _jwtService;
        private readonly IMediator _mediator;
        public CustomerChangePhotoHandler(IApplicationDbContext dbContext, IHttpUserContext httpUserContext, JwtService jwtService, IMediator mediator)
        {
            _dbContext = dbContext;
            _httpUserContext = httpUserContext;
            _jwtService = jwtService;
            _mediator = mediator;
        }

        public async Task<string> Handle(CustomerProfileChangePhotoCommand request, CancellationToken cancellationToken)
        {
            var targetCustomer = _dbContext.Customers.GetById(_httpUserContext.GetCurrentUserId().ToGuid());
            targetCustomer.Photo = await request.PhotoFile.SaveToAsync(CustomerStatics.FilesSavePath(targetCustomer.Id));
            await _dbContext.SaveChangesAsync(cancellationToken);
            var newToken = _jwtService.GenerateToken(
                targetCustomer.UserName,
                _httpUserContext.GetCurrentUserId().ToGuid(),
                UserTypes.CustomerType,
                CustomerStatics.DefaultCustomerClaim(targetCustomer.Photo,targetCustomer.Name,targetCustomer.LastName,targetCustomer.IsPremiumAccount.ToString()));
            await _mediator.Publish(new CustomerProfilePhotoChanged(),cancellationToken);
            return newToken;
        }
    }
}