import {T_RESETTHEME, T_SET_INFO_PALETTE, T_SET_PRIMARY_PALETTE, T_SET_THEME} from '../actions/ThemeCustomizationActions'
const initialState={
    colors: {
        //------------------------------primary
        primaryMain: "#fd658f",
        primaryLight: "#f79db6",
        primaryDark:"#fd658f",
        primaryContrastText:"#ffffff",
        //------------------------------info
        infoMain: "#7b6fe5",
        infoLight: "#7b6fe5",
        infoDark: "#7b6fe5",
        infoContrastText:"#ffffff",
        //------------------------------secondary
        secondaryMain: "#444444",
        secondaryLight: "#444444",
        secondaryDark: "#444444",
        secondaryContrastText:"#ffffff",
        //------------------------------seccess
        successMain: "#77fd65",
        successLight: "#77fd65",
        successDark: "#77fd65",
        successContrastText:"#ffffff",
        //------------------------------danger
        dangerMain: "#ff3838",
        dangerLight: "#ff3838",
        dangerDark: "#ff3838",
        dangerContrastText:"#ffffff",
        //------------------------------warning
        warningMain: "#ffdb38",
        warningLight: "#ffdb38",
        warningDark: "#ffdb38",
        warningContrastText:"#ffffff",
        //------------------------------gray
        grey0: "#ffffff",
        grey50: "#f1f1f1",
        grey100: "#f0f0f0",
        grey200: "#dfdddd",
        grey300: "#c9c9c9",
        grey400: "#adadad",
        grey500: "#979797",
        bodyBackgroundColor:"#ffffff"
        
    }
}
export default function ThemeCustomizationReducer(state=initialState,action){
    switch (action.type) {
        case T_SET_THEME:
            return {
                ...state,
                colors:action.payload,
                initialized:true
            }
        case T_SET_PRIMARY_PALETTE:
            return {
                ...state,
                colors:{
                    ...state.colors,
                    ...action.payload
                }
            }
        case T_SET_INFO_PALETTE:
            return {
                ...state,
                colors:{
                    ...state.colors,
                    ...action.payload
                }
            }
            case T_RESETTHEME:
                return {
                    ...state,
                    colors:{
                        ...state.colors,
                        ...action.payload
                    }
                }
        default:
          return  {...state}
    }
}