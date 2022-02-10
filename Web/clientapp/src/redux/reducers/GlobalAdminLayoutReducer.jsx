import { T_CLOSE_MENU,T_OPEN_MENU, T_SCREENXS } from "../Types/LayoutTypes";
const initialState = {
  menuOpen: true,
  screenXs:false
};
 const GlobalLayoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case T_CLOSE_MENU:
      return {
        ...state,
        menuOpen: false
      };
    case T_OPEN_MENU:
      return {
        ...state,
        menuOpen: true
      };
    case T_SCREENXS:
      return {
        ...state,
        screenXs: action.payload
      };
      default:
          return state
  }
};
export default GlobalLayoutReducer
