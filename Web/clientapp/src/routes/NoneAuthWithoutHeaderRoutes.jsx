import React from 'react'
import {LoadablePage} from "../ui-componets";
import { NoneAuthLayoutWithoutHeader } from '../layouts/noneAuthWithoutHeader';
const VLogin= LoadablePage(React.lazy(() => import("../Views/website/login")))
const VCustomerSignup= LoadablePage(React.lazy(() => import("../Views/website/signup/CustomerSignup")))
const VCompanySignup= LoadablePage(React.lazy(() => import("../Views/website/signup/CompnaySignup")))
const VSunriseLogin= LoadablePage(React.lazy(() => import("../Views/sunriseAdminManagement/login")))

const VUserSignupDone= LoadablePage(React.lazy(() => import("../Views/website/signup/VUserSignUpDone")))
const VAccountActivation= LoadablePage(React.lazy(() => import("../Views/website/AccountActivation")))
//errors
const VRequestDenied=LoadablePage(React.lazy(()=>import("../Views/shared/VRequestDenied")))
export const NoneAuthWithoutHeaderRoutes={
    path:"/",
    element:(<NoneAuthLayoutWithoutHeader/>),
    children:[
        {
            path:"login",
            element:<VLogin/>
        },
         //errors page
         {
            path:"requestDenied",
            element:<VRequestDenied/>
        },
        {
            path:"signup",
            element:<VCustomerSignup/>
        },
        {
            path:"company/signup",
            element:<VCompanySignup/>
        },
        {
            path:"signUpDone",
            element:<VUserSignupDone/>
        },
        {
            path:"activateAccount/:id",
            element:<VAccountActivation/>
        },
        {
            path:"management/login",
            element:<VSunriseLogin/>
        }
    ]
}