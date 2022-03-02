﻿using System;
using MediatR;

namespace Application.SubCustomers.Commands.UpdateAccountAmount.Deposit
{
    public record DepositSubCustomerAccountAmountCommand(
        Guid SubCustomerId,
        Guid SubCustomerAccountRateId,
        double Amount,
        string Comment) : IRequest;
}