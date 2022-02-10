import React from 'react'
import {LoadablePage} from "../ui-componets";
import { SunriseAdminDashboardAuthLayout } from '../layouts/sunriseAdminLayoutDashboard';
const VMRate= LoadablePage(React.lazy(() => import("../Views/sunriseAdminManagement/rates")))
const VMDashboard1= LoadablePage(React.lazy(() => import("../Views/sunriseAdminManagement/dashboards/VMDashboard1")))

export const SunriseAuthRoutes={
    path:"/management",
    element:(<SunriseAdminDashboardAuthLayout/>),
    children:[
        {
            path:"dashboard",
            element:<VMDashboard1/>
        },
        {
            path:"rates",
            element:<VMRate/>
        }
    ]
}