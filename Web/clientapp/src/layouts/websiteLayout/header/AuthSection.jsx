import { Box, Button, ClickAwayListener, Grid, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Paper, Popper, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth.jsx";
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import React from 'react';
import { ThemeSettings } from "../../../ui-componets";
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { ExpandLess, ExpandMore } from "@mui/icons-material";
export default function AuthSection() {
  const { isAuthenticated } = useAuth();
  const theme = useTheme()
  const [themeSettingOpen, setThemeSettingOpen] = React.useState(false)
  const navigate = useNavigate();
  const auth = useAuth()
  const screenMachedUpMd = useMediaQuery(theme.breakpoints.up("md"))
  function toggleThemeSetting() {
    setThemeSettingOpen(s => s = !s)
  }
  const signInSection = (
    <>
      <Grid item>
      <Button
          variant="text"
          color="primary"
          fullWidth
          onClick={() => navigate("/login")}
        >
          ورود
        </Button>
      </Grid>
      <Grid item>
        <Button variant="text" color="primary" onClick={() => navigate("signup")} fullWidth>
          ایجاد حساب
        </Button>
      </Grid>

    </>
  );
  const authenticatedSection = (
    <>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="small"
          onClick={() => auth.navigateToRelatedLayout()}
        >
          مدیریت
        </Button>
      </Grid>
      <Grid item>
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => toggleThemeSetting()}
            fullWidth
          >
            <FormatColorFillIcon /> Theme
          </Button>
        </Box>
        <ThemeSettings open={themeSettingOpen} closeAction={() => toggleThemeSetting()} />
      </Grid>
    </>
  );
  return <>{isAuthenticated ? authenticatedSection : signInSection}</>;
}
