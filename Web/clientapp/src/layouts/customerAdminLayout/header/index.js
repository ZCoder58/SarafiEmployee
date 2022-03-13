import { AppBar, Toolbar, useTheme, Box, useMediaQuery, IconButton } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { AdminSideMenuToggler, CTooltip, NotificationButton, SunriseNavLogo, ConvertCurrencyButton } from '../../../ui-componets'
import ProfileAccount from './ProfileAccount'
import Friends from './Friends'
import { SearchOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router'
import useAuth from '../../../hooks/useAuth'
export const Header = ({ sidebarWidth }) => {
  const theme = useTheme()
  const { menuOpen } = useSelector(state => state.R_AdminLayout)
  const isMachedDownMd = useMediaQuery(theme.breakpoints.down("md"))
  const isMachedXs = useMediaQuery(theme.breakpoints.only("xs"))
  const { isCustomer } = useAuth()
  const navigate = useNavigate()
  return (
    <AppBar
      elevation={1}
      position="fixed"
      sx={{
        width: isMachedDownMd ? "100%" : (menuOpen ? `calc(100% - ${sidebarWidth}px)` : "100%"),
        bgcolor: theme.palette.common.white,
        transition: theme.transitions.create(['margin', "width"], {
          easing: menuOpen ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp,
          duration: menuOpen ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
        })
      }}>
      <Toolbar>
        {!menuOpen && (!isMachedXs ? <SunriseNavLogo /> : "")}
        <AdminSideMenuToggler />
        {isCustomer() && <CTooltip title="جستجوی همکار">
          <IconButton size="small" onClick={() => navigate("/customer/search")}>
            <SearchOutlined />
          </IconButton>
        </CTooltip>}
        <ConvertCurrencyButton />
        <Box sx={{ flexGrow: 1 }} />
        {isCustomer() && <Friends />}
        <NotificationButton />
        <ProfileAccount />
      </Toolbar>
    </AppBar>
  )
}