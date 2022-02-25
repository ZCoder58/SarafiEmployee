using System;
using MediatR;

namespace Application.Company.Company.Commands.CreateCompany
{
    public class CreateCompanyCommand:IRequest<Guid>
    {
        public string Companyname { get; set; }
    }
}