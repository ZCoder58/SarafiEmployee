
import React from "react";
import { CustomerAuthLayout } from "../layouts/customerAdminLayout"
import {LoadablePage} from "../ui-componets";
const VDashboard= LoadablePage(React.lazy(() => import("../Views/CustomerAdmin/dashboards/VDashboard.jsx")))
//rates
const VCExchangeRates= LoadablePage(React.lazy(() => import("../Views/CustomerAdmin/Rates")))
const VCProfile= LoadablePage(React.lazy(() => import("../Views/CustomerAdmin/profile")))
//Friends
const VCFriends= LoadablePage(React.lazy(() => import("../Views/CustomerAdmin/Friends")))
//search
const VCSearch= LoadablePage(React.lazy(() => import("../Views/CustomerAdmin/SearchCustomers")))
//transfers
const VCTransfers=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/Transfers")))
const VCCreateTransferIndex=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/Transfers/VCCreateTransferIndex")))
const VCTransferInboxDetail=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/Transfers/VCTransferInboxInfo")))
const VCTransferOutboxDetail=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/Transfers/VCTransferOutboxInfo")))
const VCEditTransfer=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/Transfers/VCEditTransfer")))
const SubCustomerEditTransfer=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/Transfers/SubCustomerEditTransfer")))
//roznamche
const VCRoznamcha=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/Roznamcha")))
//general
const VCOtherCustomerProfile=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/Friends/VCOtherCustomerProfile")))
//subCustomers
const VCSubCustomers=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/SubCustomers")))
const VCSubcustomersCreate=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/SubCustomers/VCSubCustomersCreate")))
const VCSubcustomersEdit=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/SubCustomers/VCSubCustomersEdit")))
const VCTransactions=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/SubCustomers/Transactions/VCTransactions")))
const VCSubCustomersAccounts=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/SubCustomers/Accounts/VCSubCustomersAccounts")))
export const CustomerAuthRoutes={
    path:"/customer",
    element:<CustomerAuthLayout/>,
    children:[
        {
            path:"",
            element:<VDashboard/>
        },
        {
            path:"dashboard",
            element:<VDashboard/>
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