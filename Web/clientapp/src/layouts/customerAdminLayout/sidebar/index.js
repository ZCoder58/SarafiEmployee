import React from 'react';
import { Drawer, useTheme, useMediaQuery, Stack, Typography } from '@mui/material';
import MenuList from './MenuList';
import { useSelector } from 'react-redux';
import { AdminSideMenuToggler, SunriseNavLogo } from '../../../ui-componets';
function Sidebar({ sidebarWidth }) {
    const theme = useTheme()
    const { menuOpen } = useSelector(state => state.R_AdminLayout)
    const isMachedDownMd = useMediaQuery(theme.breakpoints.down("md"))
  
    const renderMobileSidebarHeader = (
        <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center" p={1}>
            <SunriseNavLogo/>
            <Typography variant="h5">صرافــــــــــی آنلاین</Typography>
            <AdminSideMenuToggler />
        </Stack>
    )
    const renderDesktopSidebarHeader = (
        <Stack direction="row" spacing={1} alignItems="center">
           { menuOpen&&<SunriseNavLogo sx={{padding:"5px 5px"}}/>}
           { menuOpen&&<Typography variant="h5">صرافــــــــــی آنلاین</Typography>}
        </Stack>
    )
    return (
        <>
            <Drawer
                anchor="left"
                open={menuOpen}
                variant={isMachedDownMd?"temporary":"persistent"}
                ModalProps={{ keepMounted: true }}
                width={sidebarWidth}
                sx={{
                    width: sidebarWidth,
                    '& .MuiDrawer-paper': {
                        minWidth: sidebarWidth
                    },
                    [theme.breakpoints.down("md")]: {
                        '& .MuiDrawer-paper': {
                            width: '100%'
                        }
                    }
                }}
            >
                {isMachedDownMd? renderMobileSidebarHeader:renderDesktopSidebarHeader}
                <div style={{ minHeight: 500 }}>
                    <MenuList />
                </div>
            </Drawer>
        </>
    )
}
export default Sidebar
