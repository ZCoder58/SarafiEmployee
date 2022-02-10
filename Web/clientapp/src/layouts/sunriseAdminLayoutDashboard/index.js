
import { Navigate, Outlet } from 'react-router'
import React from 'react'
import { Header } from './header'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import AuthGuard from '../../auth/AuthGuard'
import Sidebar from './sidebar'
import { useSelector } from 'react-redux'
import { NotifyHub } from '../../Hubs'
import useAuth from '../../hooks/useAuth'
const menuWidth = 290;
export const SunriseAdminDashboardAuthLayout = () => {
  const theme = useTheme()
  const auth=useAuth()
  const { menuOpen } = useSelector(state => state.R_AdminLayout)
  const isMachedDownMd = useMediaQuery(theme.breakpoints.down("md"))
  if(!auth.isSunriseAdmin()){
    return <Navigate to="/home"/>
  }
  return (
    <AuthGuard>
      <Header sidebarWidth={menuWidth} />
      <Box sx={{
        mt: 7,
        pt: 2,
        pr: 1,
        pl: 1,
        display:"flex"
      }}>
        <Sidebar sidebarWidth={menuWidth} />
        <Box component="main" sx={{
          transition: theme.transitions.create(['margin',"width"], {
            easing: menuOpen ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp,
            duration: menuOpen ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
          }),
          marginLeft:isMachedDownMd?0:(menuOpen ? 0 : `${-menuWidth}px`),
          width:isMachedDownMd?"100%":(menuOpen ? `calc(100% - ${menuWidth}px)` : `100%`)
        }}>
          <NotifyHub>
            <Outlet />
          </NotifyHub>
        </Box>
      </Box>
    </AuthGuard>
  )
}