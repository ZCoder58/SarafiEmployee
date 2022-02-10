import { T_CLOSE_MENU, T_OPEN_MENU, T_SCREENXS } from "../Types/LayoutTypes.jsx"
/**
 * close sidebar menu
 * @returns 
 */
export const A_CloseSideMenu=()=>dispatch=>{
    dispatch({
        type:T_CLOSE_MENU
    })
}
/**
 * open sidebar menu
 * @returns 
 */
export const A_OpenSideMenu=()=>dispatch=>{
    dispatch({
        type:T_OPEN_MENU
    })
}
export const A_SetScreenXS=(isScreenXS)=>dispatch=>{
    dispatch({
        type:T_SCREENXS,
        payload:isScreenXS
    })
}