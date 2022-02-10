import { NotificationsOutlined } from '@mui/icons-material'
import { AppBar, Toolbar, useTheme, Box, IconButton, useMediaQuery } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { AdminSideMenuToggler, SunriseNavLogo } from '../../../ui-componets'
import ProfileAccount from './ProfileAccount'
export const Header = ({ sidebarWidth }) => {
  const theme = useTheme()
  const { menuOpen } = useSelector(state => state.R_AdminLayout)
  const isMachedDownMd = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <AppBar
      elevation={1}
      position="fixed"
      sx={{
        width: isMachedDownMd ? "100%" : (menuOpen ? `calc(100% - ${sidebarWidth}px)` : "100%"),
        bgcolor: theme.palette.background.default,
        transition: theme.transitions.create(['margin', "width"], {
          easing: menuOpen ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp,
          duration: menuOpen ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
        }),
      }}>
      <Toolbar>
        {!menuOpen && <SunriseNavLogo />}
        <AdminSideMenuToggler />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton>
          <NotificationsOutlined />
        </IconButton>
        <ProfileAccount />
      </Toolbar>
    </AppBar>
  )
}