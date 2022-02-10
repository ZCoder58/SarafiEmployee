import {
  Button,
  IconButton,
  Drawer,
  List,
  Grid,
  ListItemButton,
  styled,
  Box,
  Toolbar,
  Typography,
  Stack
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { useTheme } from '@mui/material/styles'
import commonPages from "../../../menuItems/website/common.jsx";
import { MenuSharp, NotificationsOutlined } from "@mui/icons-material";
import { shouldForwardProp } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import AuthSection from "./AuthSection.jsx";
import logoSm from '../../../assets/images/logoSm.png'

const StyledListItemButton = styled(ListItemButton, { shouldForwardProp })({
  // display: "flex",
  // justifyContent: "center"
});
export default function MobileNav() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <>
      <Toolbar>
        <Grid
          container
          display="flex"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item display="flex" flexDirection="row" alignItems="flex-end">
            <Box component="img" src={logoSm}></Box>
            <Typography variant="h5" fontWeight="900">
              صرافــــی
            </Typography>
          </Grid>
          <Grid item>
            <Stack  spacing={2} direction="row-reverse">
              <Button onClick={() => setMenuOpen(!menuOpen)} size="large" color="secondary">
                <MenuSharp />
              </Button>
              <IconButton color="primary">
                <NotificationsOutlined />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>

      <Drawer
        anchor="left"
        sx={{
          "& .MuiDrawer-paper": {
            minWidth: "270px"
          },
          [theme.breakpoints.down("sm")]: {
            "& .MuiDrawer-paper": {
              width: "100%"
            }
          }
        }}
        open={menuOpen}
        ModalProps={{ keepMounted: true }}
      >
        <Box display="flex" justifyContent="flex-end" >
          <IconButton onClick={() => setMenuOpen(!menuOpen)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {commonPages.map(page => (
            <StyledListItemButton
              key={page.path}
              onClick={() => navigate(page.path)}
            >
              {page.title}
            </StyledListItemButton>
          ))}
        </List>
        <Grid
          container
          spacing={1}
          sx={{ px: 2 }}
          display="flex"
          flexDirection="column"
          // justifyContent="center"
        >
          <AuthSection />
        </Grid>
      </Drawer>
    </>
  );
}
