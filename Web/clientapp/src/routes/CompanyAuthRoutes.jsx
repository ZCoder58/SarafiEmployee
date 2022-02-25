
import React from "react";
import { CompanyAuthLayout } from "../layouts/companyAdminLayout"
import {LoadablePage} from "../ui-componets";
const VDashboard= LoadablePage(React.lazy(() => import("../Views/company/dashboards/VDashboard")))
//rates
const VCExchangeRates= LoadablePage(React.lazy(() => import("../Views/company/Rates")))
const VCProfile= LoadablePage(React.lazy(() => import("../Views/company/profile")))
//Friends
const VCFriends= LoadablePage(React.lazy(() => import("../Views/company/Friends")))
//search
const VCSearch= LoadablePage(React.lazy(() => import("../Views/company/SearchCustomers")))
//transfers
const VCTransfers=LoadablePage(React.lazy(()=>import("../Views/company/Transfers")))
const VCCreateTransferIndex=LoadablePage(React.lazy(()=>import("../Views/company/Transfers/VCCreateTransferIndex")))
const VCTransferInboxDetail=LoadablePage(React.lazy(()=>import("../Views/company/Transfers/VCTransferInboxInfo")))
const VCTransferOutboxDetail=LoadablePage(React.lazy(()=>import("../Views/company/Transfers/VCTransferOutboxInfo")))
const VCEditTransfer=LoadablePage(React.lazy(()=>import("../Views/company/Transfers/VCEditTransfer")))
const SubCustomerEditTransfer=LoadablePage(React.lazy(()=>import("../Views/company/Transfers/SubCustomerEditTransfer")))
//roznamche
const VCRoznamcha=LoadablePage(React.lazy(()=>import("../Views/company/Roznamcha")))
//general
const VCOtherCustomerProfile=LoadablePage(React.lazy(()=>import("../Views/company/Friends/VCOtherCustomerProfile")))
//subCustomers
const VCSubCustomers=LoadablePage(React.lazy(()=>import("../Views/company/SubCustomers")))
const VCSubcustomersCreate=LoadablePage(React.lazy(()=>import("../Views/company/SubCustomers/VCSubCustomersCreate")))
const VCSubcustomersEdit=LoadablePage(React.lazy(()=>import("../Views/company/SubCustomers/VCSubCustomersEdit")))
const VCTransactions=LoadablePage(React.lazy(()=>import("../Views/company/SubCustomers/Transactions/VCTransactions")))
const VCSubCustomersAccounts=LoadablePage(React.lazy(()=>import("../Views/company/SubCustomers/Accounts/VCSubCustomersAccounts")))
//employees
const VEmployees=LoadablePage(React.lazy(()=>import("../Views/company/Employees")))
const VNewEmployees=LoadablePage(React.lazy(()=>import("../Views/company/Employees/VNewEmployee")))
const VEditEmployees=LoadablePage(React.lazy(()=>import("../Views/company/Employees/VEditEmployee")))

export const CompanyAuthRoutes={
    path:"/company",
    element:<CompanyAuthLayout/>,
    children:[
        {
            path:"",
            element:<VDashboard/>
        },
        {
            path:"dashboard",
            element:<VDashboard/>
        },
        //employees
        {
            path:"employees",
            element:<VEmployees/>
        },
        {
            path:"employees/newEmployee",
            element:<VNewEmployees/>
        },
        {
            path:"employees/edit/:employeeId",
            element:<VEditEmployees/>
        },
        //subCustomers
        {
            path:"subCustomers",
            element:<VCSubCustomers/>
        },
        {
            path:"subCustomers/newSubCustomer",
            element:<VCSubcustomersCreate/>
        },
        {
            path:"subCustomers/edit/:subCustomerId",
            element:<VCSubcustomersEdit/>
        },
        {
            path:"subCustomers/transactions/:subCustomerId",
            element:<VCTransactions/>
        },
        {
            path:"subCustomers/accounts/:subCustomerId",
            element:<VCSubCustomersAccounts/>
        },
        {
            path:"subCustomers/transfers/edit/:transferId",
            element:<SubCustomerEditTransfer/>
        },
        //roznamcha
        {
            path:"report",
            element:<VCRoznamcha/>
        },
        //transfers
        {
            path:"transfers",
            element:<VCTransfers/>
        },
        {
            path:"transfers/newTransfer",
            element:<VCCreateTransferIndex/>
        },
        {
            path:"transfers/edit/:transferId",
            element:<VCEditTransfer/>
        },
        
        {
            path:"transfers/inbox/:transferId",
            element:<VCTransferInboxDetail/>
        },
        {
            path:"transfers/outbox/:transferId",
            element:<VCTransferOutboxDetail/>
        },
        ///rates
        {
            path:"rates",
            element:<VCExchangeRates/>
        },
        //customer
        {
            path:"profile",
            element:<VCProfile/>
        },
        //friends
        {
            path:"friends/:queryTab",
            element:<VCFriends/>
        },
        //search
        {
            path:"search",
            element:<VCSearch/>
        },
        //general
        {
            path:"profile/:customerId",
            element:<VCOtherCustomerProfile/>
        }
    ]
}