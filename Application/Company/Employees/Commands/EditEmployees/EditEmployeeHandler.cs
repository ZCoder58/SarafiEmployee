using System.Threading;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using AutoMapper;
using Domain.Interfaces;
using MediatR;

namespace Application.Company.Employees.Commands.EditEmployees
{
    public class EditCustomerHandler:IRequestHandler<EditEmployeeCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly IHttpUserContext _httpUserContext;
        public EditCustomerHandler(IApplicationDbContext dbContext, IMapper mapper, IMediator mediator, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _mediator = mediator;
            _httpUserContext = httpUserContext;
        }

        public async Task<Unit> Handle(EditEmployeeCommand request, CancellationToken cancellationToken)
        {
            var targetEmployee = _dbContext.Customers.GetById(request.Id);
            _mapper.Map(request,targetEmployee);
            if (request.PhotoFile.IsNotNull()) 
            {
                targetEmployee.Photo=await request.PhotoFile.SaveToAsync(CustomerStatics.PhotoSavePath(targetEmployee.Id));
            }
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}