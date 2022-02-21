using System;
using MediatR;

namespace Application.SubCustomers.Commands.EditSubCustomerAccount
{
    public class EditSubCustomerCommand:IRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public int SId { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
    }
}