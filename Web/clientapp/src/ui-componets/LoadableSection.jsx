import { Suspense } from "react"
import Loading from './Loading'
export default function LoadableSection({children}){
    return (
         <Suspense fallback={<Loading />}>{children}</Suspense>
    )
}