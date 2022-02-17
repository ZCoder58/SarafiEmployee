import { Outlet } from 'react-router';
import React from 'react';
import { Box } from '@mui/material';
import Header from './header';
import { GotToTopButton } from '../../ui-componets';
import Footer from './footer';
import { useSelector } from 'react-redux';
const WebSiteLayout=()=>{
  const { scrolled } = useSelector(state => state.R_WebsiteLayout)
  return (
    <Box>
      <Header />
      <Box>
        <Outlet />
        <GotToTopButton show={scrolled}/>
      </Box>
      <Footer/>
    </Box>
  )
}
export default WebSiteLayout
