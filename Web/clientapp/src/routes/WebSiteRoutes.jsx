import React from 'react'
import {LoadablePage} from "../ui-componets";
import WebSiteLayout from "../layouts/websiteLayout"
const VHome= LoadablePage(React.lazy(() => import("../Views/website/home")))
const VPricing= LoadablePage(React.lazy(() => import("../Views/website/pricing")))

export const WebSiteRoutes={
    path:"/",
    element:(<WebSiteLayout/>),
    children:[
        {
            path:"",//default route should be home
            element:<VHome/>
        },
        {
            path:"home",//default route should be home
            element:<VHome/>
        },
        {
            path:"pricing",
            element:<VPricing/>
        }

    ]
}