import { useRoutes } from "react-router";
import { CustomerAuthRoutes } from "./CustomerAuthRoutes";
import { CompanyAuthRoutes } from "./CompanyAuthRoutes";
import { WebSiteRoutes } from "./WebSiteRoutes.jsx";
import { NoneAuthWithoutHeaderRoutes } from "./NoneAuthWithoutHeaderRoutes.jsx";
import { SunriseAuthRoutes } from "./SunriseAdminDashboardRoutes";

const AppRoutes=()=>useRoutes([SunriseAuthRoutes,CustomerAuthRoutes,CompanyAuthRoutes,WebSiteRoutes,NoneAuthWithoutHeaderRoutes])
export default AppRoutes