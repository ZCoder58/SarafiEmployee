import { T_SCROLLED,T_SCROLLED_ZERO } from "../Types/WebsiteTypes";
const initialState={
    scrolled:false
}
const WebsiteLayoutReducer=(state=initialState,action)=>{
    switch (action.type) {
        case T_SCROLLED:
            return {
                ...state,
                scrolled:true
            }
        case T_SCROLLED_ZERO:
            return {
                ...state,
                scrolled:false
            }
        default:
            return {...state}
    }
}
export default WebsiteLayoutReducer