import React from 'react'
import { SnackbarProvider } from 'notistack';
import {
  BrowserRouter as Router
} from "react-router-dom";
import NavigationScroll from './layouts/NavigationScroll'
import AppRoutes from "./routes";
import { ToastContextProvider } from "./contexts/ToastContext";
import { DialogProvider } from "./contexts/DialogContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CssBaseline, ThemeProvider } from '@mui/material';
import websiteTheme from './Themes/website';
import colors from './assets/_colors.module.scss'
import RtlProvider from './contexts/rtlContext'
import { useTheme,useMediaQuery } from "@mui/material";
import { useDispatch } from 'react-redux';
import { A_SetScreenXS } from './redux/actions/LayoutActions';


function App() {
  const theme=useTheme()
  const isScreenMachXS=useMediaQuery(theme.breakpoints.down("sm"))
  const dispatch=useDispatch()
  React.useEffect(()=>{
    dispatch(A_SetScreenXS(isScreenMachXS))
  },[isScreenMachXS,dispatch])
  return (
    <React.Fragment>
      <ThemeProvider theme={websiteTheme(colors)}>
        <CssBaseline />
        <RtlProvider>
        <Router>
          <AuthProvider>
            <SnackbarProvider>
              <ToastContextProvider>
                <DialogProvider>
                  <NavigationScroll>
                    <AppRoutes />
                  </NavigationScroll>
                </DialogProvider>
              </ToastContextProvider>
            </SnackbarProvider>
          </AuthProvider>
        </Router>
        </RtlProvider>
      </ThemeProvider>

    </React.Fragment>
  );
}

export default App;
