using System;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Company.Company.Commands.CreateCompany
{
    public class CreateCompanyHandler:IRequestHandler<CreateCompanyCommand,Guid>
    {
        private readonly IApplicationDbContext _dbContext;

        public CreateCompanyHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> Handle(CreateCompanyCommand request, CancellationToken cancellationToken)
        {
            var newEmployeeSetting= (await _dbContext.EmployeeSettings.AddAsync(new EmployeeSetting()
            {
                CanBeFriendWithOthers = false
            }, cancellationToken)).Entity;
            await _dbContext.SaveChangesAsync(cancellationToken);

           var newCompany= (await _dbContext.CompaniesInfos.AddAsync(new CompanyInfo()
           {
               CompanyName = request.Companyname,
               EmployeeSettingId = newEmployeeSetting.Id
           }, cancellationToken)).Entity;
           return newCompany.Id;
        }
    }
}