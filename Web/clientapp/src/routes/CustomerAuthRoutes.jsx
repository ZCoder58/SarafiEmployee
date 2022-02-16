
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
const VCreateTransfe=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/Transfers/VCreateTransfer")))
const VCTransferInboxDetail=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/Transfers/VCTransferInboxInfo")))
const VCTransferOutboxDetail=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/Transfers/VCTransferOutboxInfo")))
//roznamche
const VCRoznamcha=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/Roznamcha")))
//general
const VCOtherCustomerProfile=LoadablePage(React.lazy(()=>import("../Views/CustomerAdmin/Friends/VCOtherCustomerProfile")))
export const CustomerAuthRoutes={
    path:"/customer",
    element:<CustomerAuthLayout/>,
    children:[
        {
            path:"dashboard",
            element:<VDashboard/>
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
            path:"newTransfer",
            element:<VCreateTransfe/>
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
        // ///exchange rates
        // {
        //     path:"todayExchangeRates",
        //     element:<VExchangeRates/>
        // },
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