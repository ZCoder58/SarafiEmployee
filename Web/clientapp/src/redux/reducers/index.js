import { combineReducers } from 'redux';
import CustomerLayoutReducer from './CustomerLayoutReducer';
import GlobalLayoutReducer from './GlobalAdminLayoutReducer';
import ThemeCustomizationReducer from './ThemeCustomizationReducer';
import WebsiteLayoutReducer from './WebsiteLayoutReducer';

export const Reducers=combineReducers({
    R_AdminLayout:GlobalLayoutReducer,
    R_WebsiteLayout:WebsiteLayoutReducer,
    R_WebsiteTheme:ThemeCustomizationReducer,
    R_Customer:CustomerLayoutReducer
})
