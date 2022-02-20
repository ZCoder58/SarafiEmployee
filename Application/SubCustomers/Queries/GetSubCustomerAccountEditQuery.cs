using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Extensions;
using Application.Common.Extensions.DbContext;
using Application.Common.Statics;
using Application.SubCustomers.DTOs;
using AutoMapper;
using Domain.Interfaces;
using MediatR;

namespace Application.SubCustomers.Queries
{
    public record GetSubCustomerAccountEditQuery(Guid Id) : IRequest<SubCustomerEditDTo>;

    public class GetSubCustomerAccountEditHandler:IRequestHandler<GetSubCustomerAccountEditQuery,SubCustomerEditDTo>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IHttpUserContext _httpUserContext;
        private readonly IMapper _mapper;
        public GetSubCustomerAccountEditHandler(IApplicationDbContext dbContext, IMapper mapper, IHttpUserContext httpUserContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpUserContext = httpUserContext;
        }

        public  Task<SubCustomerEditDTo> Handle(GetSubCustomerAccountEditQuery request, CancellationToken cancellationToken)
        {
            var targetSubCustomer = _dbContext.SubCustomerAccounts.Where(a =>
                a.CustomerId == _httpUserContext.GetCurrentUserId().ToGuid()).GetById(request.Id);
            if (targetSubCustomer.IsNull())
            {
                throw new EntityNotFoundException();
            }

            return Task.FromResult(_mapper.Map<SubCustomerEditDTo>(targetSubCustomer));
        }
    }
}