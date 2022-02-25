import { Navigate, Outlet } from 'react-router'
import * as React from 'react';
import { Box } from '@mui/material';
import useAuth from '../../hooks/useAuth';
export const NoneAuthLayoutWithoutHeader = () => {
  const {isAuthenticated}=useAuth()
  if(isAuthenticated){
    <Navigate to="/"/>
  }
  return (
    <Box>
      <Box className="main-container">
        <Outlet />
      </Box>
    </Box>
  )
}