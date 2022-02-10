import { CircularProgress } from "@mui/material"
import { Suspense } from "react"
const AppSuspense = ({ children }) => {
    return (<Suspense fallback={<CircularProgress size="small"/>}>{children}</Suspense>)
}
export default AppSuspense