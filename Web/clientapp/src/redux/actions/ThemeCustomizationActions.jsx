import authAxiosApi, { axiosApi } from "../../axios";
import JsonOptions from "../../services/JsonOptions.jsx";

export const T_SET_THEME = "SET_THEME";
export const T_SET_PRIMARY_PALETTE = "SET_PRIMARY_PALETTE";
export const T_SET_INFO_PALETTE = "SET_INFO_PALETTE";
export const T_RESETTHEME = "RESET_THEME";
export const setInitTheme =() =>async (dispatch) => {
    await axiosApi.get(`/General/GetTheme`).then(res=>{
       const themePalette=JsonOptions.convertToJson(res)
        dispatch({
            type:T_SET_THEME,
            payload:themePalette
        })
    })
};
export const setPrimaryPalette=(primaryPalette)=>dispatch=>{
    
    dispatch({
        type:T_SET_PRIMARY_PALETTE,
        payload:primaryPalette
    })
}
export const setInfoPalette=(infoPalette)=>dispatch=>{
    dispatch({
        type:T_SET_INFO_PALETTE,
        payload:infoPalette
    })
}
export const saveTheme=(onSaved)=>async (dispatch,getState)=>{
    const {colors}=getState().R_WebsiteTheme
    await authAxiosApi.post(`/General/SaveTheme`,JsonOptions.convertToString(colors),{ headers: {'Content-Type': 'application/json'} }).then(isSaved=>{
        onSaved(isSaved)
   })
}
export const resetTheme =() =>async (dispatch) => {
    await authAxiosApi.post(`/General/ResetTheme`).then(res=>{
       const themePalette=JsonOptions.convertToJson(res)
        dispatch({
            type:T_RESETTHEME,
            payload:themePalette
        })
    })
};
