import React from 'react'
import {LoadablePage} from "../ui-componets";
import { NoneAuthLayoutWithoutHeader } from '../layouts/noneAuthWithoutHeader';
const VLogin= LoadablePage(React.lazy(() => import("../Views/website/login")))
const VSignup= LoadablePage(React.lazy(() => import("../Views/website/signup")))
const VSunriseLogin= LoadablePage(React.lazy(() => import("../Views/sunriseAdminManagement/login")))

export const NoneAuthWithoutHeaderRoutes={
    path:"/",
    element:(<NoneAuthLayoutWithoutHeader/>),
    children:[
        {
            path:"login",
            element:<VLogin/>
        },
        {
            path:"signup",
            element:<VSignup/>
        },
        {
            path:"management/login",
            element:<VSunriseLogin/>
        }
    ]
}