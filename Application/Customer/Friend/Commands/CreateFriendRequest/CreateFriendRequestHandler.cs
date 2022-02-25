using System.Threading;
using System.Threading.Tasks;
using Domain.Interfaces;
using MediatR;

namespace Application.Customer.Friend.Commands.CreateFriendRequest
{
    public class CreateFriendRequestHandler:IRequestHandler<CreateFriendRequestCommand,Domain.Entities.Friend>
    {
        private readonly IApplicationDbContext _dbContext;

        public CreateFriendRequestHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Domain.Entities.Friend> Handle(CreateFriendRequestCommand request, CancellationToken cancellationToken)
        {
            var newFriend=await _dbContext.Friends.AddAsync(new Domain.Entities.Friend()
            {
                CustomerId = request.WhoCustomerId,
                CustomerFriendId = request.WithCustomerId,
                State = request.WhoState,
                CustomerFriendApproved = request.WhoCustomerFriendApproved
            }, cancellationToken);
            await _dbContext.Friends.AddAsync(new Domain.Entities.Friend()
            {
                CustomerFriendId = request.WhoCustomerId,
                CustomerId = request.WithCustomerId,
                State = request.WithState,
                CustomerFriendApproved = request.WithCustomerFriendApproved
            }, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return newFriend.Entity;
        }
    }
}
