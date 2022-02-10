import { Toolbar,Grid,Typography,Button, useTheme,Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import commonPages from '../../../menuItems/website/common'
import AuthSection from './AuthSection'
import logoSm from '../../../assets/images/logoSm.png'
export default function DesktopNav(){
    const navigate=useNavigate()
    return (
        <Toolbar>
        <Grid container display="flex" spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item display="flex" flexDirection="row" alignItems="flex-end">
            <Box component="img" src={logoSm}></Box>
            <Typography variant="h5" fontWeight="900">
              صرافــــی 
            </Typography>
          </Grid>
          <Grid item display="flex">
            {commonPages.map((page) => (
              <Button
                key={page.path}
                color="secondary"
                onClick={() => navigate(page.path)}
              >
                {page.title}
              </Button>
            ))}
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
             <AuthSection/>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    )
}