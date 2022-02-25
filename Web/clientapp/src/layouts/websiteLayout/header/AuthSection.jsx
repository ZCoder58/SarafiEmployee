import { Button, Grid, List, ListItemButton, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { MenuAndToggleButton, MenuListToggle } from '../../../ui-componets'
import useAuth from "../../../hooks/useAuth";
import React from 'react';
export default function AuthSection() {
  const navigate = useNavigate();
  const auth = useAuth()
  const theme = useTheme()
  const screenXs = useMediaQuery(theme.breakpoints.down("md"))
  const signInSection = (
    <>

      {screenXs ?
        <Grid item>
          <ListItemButton onClick={() => navigate("/login")}>
            <ListItemText primary="ورود" />
          </ListItemButton>
          <MenuListToggle text="ساخت حساب">
            <ListItemButton onClick={() => navigate(`/company/signup`)}>
              <ListItemText primary="برای شرکت" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate(`/signup`)}>
              <ListItemText primary="برای خودم" />
            </ListItemButton>
          </MenuListToggle>
        </Grid>
        :
         <>
          <Grid item>
            <Button
              variant="text"
              color="primary"
              fullWidth
              size="small"
              onClick={() => navigate("/login")}
            >
              ورود
            </Button>
            </Grid>
            <Grid item>
            <MenuAndToggleButton text="ساخت حساب">
              <List>
                <ListItemButton onClick={() => navigate(`/company/signup`)}>
                  <ListItemText>برای شرکت</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => navigate(`/signup`)}>
                  <ListItemText>برای خودم</ListItemText>
                </ListItemButton>
              </List>
            </MenuAndToggleButton>
          </Grid>
         </>
      }
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
          onClick={() => navigate(auth.getRelatedLayoutPath())}
        >
          مدیریت
        </Button>
      </Grid>
      {/* <Grid item>
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
      </Grid> */}
    </>
  );
  return <>{auth.isAuthenticated ? authenticatedSection : signInSection}</>;
}
