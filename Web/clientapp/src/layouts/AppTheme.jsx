import React from "react";
import {  useSelector } from "react-redux";
import websiteTheme from "../Themes/website";
// import { FullLoading } from "../ui-componets";
import { CssBaseline, ThemeProvider } from "@mui/material";
export const AppTheme = ({ children }) => {
  const websiteThemeOptions = useSelector(s => s.R_WebsiteTheme);
  // if (!websiteThemeOptions.initialized) {
  //   return <FullLoading />;
  // }
  return (
    <ThemeProvider theme={websiteTheme(websiteThemeOptions.colors)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
