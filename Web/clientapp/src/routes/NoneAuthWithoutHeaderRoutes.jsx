import React from 'react'
import {LoadablePage} from "../ui-componets";
import { NoneAuthLayoutWithoutHeader } from '../layouts/noneAuthWithoutHeader';
const VLogin= LoadablePage(React.lazy(() => import("../Views/website/login")))
const VSignup= LoadablePage(React.lazy(() => import("../Views/website/signup")))
const VSunriseLogin= LoadablePage(React.lazy(() => import("../Views/sunriseAdminManagement/login")))

const VUserSignupDone= LoadablePage(React.lazy(() => import("../Views/website/signup/VUserSignUpDone")))
const VAccountActivation= LoadablePage(React.lazy(() => import("../Views/website/AccountActivation")))
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