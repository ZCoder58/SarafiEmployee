import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth.jsx";
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import React from 'react';
import { ThemeSettings } from "../../../ui-componets";
export default function AuthSection() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const auth = useAuth()
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
        <Button variant="text" color="primary" onClick={() => navigate("signUp")} fullWidth>
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
  return <>{isAuthenticated ? authenticatedSection : signInSection}</>;
}
