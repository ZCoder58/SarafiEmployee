import { Skeleton } from "@mui/material"

export default function CSkeleto({loading,children,...props}){
    if(loading){
        return <Skeleton {...props} width="100%" height="100%"/>
    }else{
        return  children
    }
}