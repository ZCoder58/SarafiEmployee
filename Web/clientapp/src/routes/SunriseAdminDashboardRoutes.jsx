import React from 'react'
import {LoadablePage} from "../ui-componets";
import { SunriseAdminDashboardAuthLayout } from '../layouts/sunriseAdminLayoutDashboard';
const VMDashboard1= LoadablePage(React.lazy(() => import("../Views/sunriseAdminManagement/dashboards/VMDashboard1")))
//rates
const VMRate= LoadablePage(React.lazy(() => import("../Views/sunriseAdminManagement/rates")))
//customers
const VMCustomers= LoadablePage(React.lazy(() => import("../Views/sunriseAdminManagement/Customers")))
export const SunriseAuthRoutes={
    path:"/management",
    element:(<SunriseAdminDashboardAuthLayout/>),
    children:[
        {
            path:"dashboard",
            element:<VMDashboard1/>
        },
        //rates
        {
            path:"rates",
            element:<VMRate/>
        },
        //customers
        {
            path:"customers",
            element:<VMCustomers/>
        }
    ]
}