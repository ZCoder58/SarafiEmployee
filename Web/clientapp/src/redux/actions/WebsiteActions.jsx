import { T_SCROLLED, T_SCROLLED_ZERO } from "../Types/WebsiteTypes.jsx"

export const A_LayoutScrolled=()=>{
    return (dispatch)=>{
        dispatch({
            type:T_SCROLLED
        })
    }
}

export const A_LayoutScrolledZero=()=>{
    return (dispatch)=>{
        dispatch({
            type:T_SCROLLED_ZERO
        })
    }
}