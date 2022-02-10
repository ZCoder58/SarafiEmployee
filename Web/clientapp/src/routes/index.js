import { useRoutes } from "react-router";
import { CustomerAuthRoutes } from "./CustomerAuthRoutes";
import { WebSiteRoutes } from "./WebSiteRoutes.jsx";
import { NoneAuthWithoutHeaderRoutes } from "./NoneAuthWithoutHeaderRoutes.jsx";
import { SunriseAuthRoutes } from "./SunriseAdminDashboardRoutes";

const AppRoutes=()=>useRoutes([SunriseAuthRoutes,CustomerAuthRoutes,WebSiteRoutes,NoneAuthWithoutHeaderRoutes])
export default AppRoutes