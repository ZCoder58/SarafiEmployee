// using System;
// using MediatR;
//
// namespace Application.SubCustomers.Commands.UpdateAccountAmount.TransferToAccount
// {
//     public class TransferToAccountCommand:IRequest
//     {
//         public Guid SubCustomerId { get; set; }
//         public Guid SubCustomerAccountRateId { get; set; }
//         public double Amount { get; set; }
//         public string Comment { get; set; }
//         public Guid ToSubCustomerId { get; set; }
//         public Guid ToSubCustomerAccountRateId { get; set; }
//         public string ExchangeType { get; set; }
//     }
// }