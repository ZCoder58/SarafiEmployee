import { Popover, IconButton, Paper, List, ListItemButton, Stack, Typography, useTheme, useMediaQuery, Drawer, Box, Divider, Button, Badge } from '@mui/material'
import React from 'react'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// import TimeAgo from 'react-timeago'
import faString from 'react-timeago/lib/language-strings/fa'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { CTooltip } from '.';
import { SkeletonFull } from '.'
import { CloseOutlined } from '@mui/icons-material';
import useNotifications from '../hooks/useNotifications'
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth'
import moment from 'moment'
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';

// import it first.
import fa from 'timeago.js/lib/lang/fa';

// register it.
timeago.register('fa', fa);
moment.locale("fa")
const formatter = buildFormatter(faString)
export default function NotificationButton() {
 
    const { loading, notifications, notificationCount,unSeensCount,seenNotifications } = useNotifications()
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate=useNavigate()
    const auth=useAuth()
    const screenMachedXS = useMediaQuery(theme.breakpoints.down("sm"))
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        if(unSeensCount>0){
            seenNotifications()
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const notificDataRender = <List dense>
        {notifications.map((d, i) =>
            <ListItemButton key={i} sx={{ width: "100%", minWidth: 280 }} onClick={()=>{
                if(d.type==="newTransfer"){
                    navigate(`/${auth.isCompany()?"company":"customer"}/transfers/inbox/${d.baseId}`)
                    handleClose()
                }else if(d.type==="request"){
                    navigate(`/${auth.isCompany()?"company":"customer"}/profile/${d.baseId}`)
                    handleClose()
                
                }else if(d.type==="deniedTransfer"){
                    navigate(`/${auth.isCompany()?"company":"customer"}/transfers/outBox/${d.baseId}`)
                    handleClose()
                }
            }}>
                <Stack direction="column" spacing={1} width="100%">
                    <Stack direction="row" justifyContent="space-between" spacing={1} >
                        <Typography fontSize="14px">
                            {d.title}
                        </Typography>
                        <Typography fontSize="11px" color="primary">
                            <TimeAgo datetime={new Date(d.date+'Z')} locale='fa' live opts={{
                                relativeDate:new Date().toUTCString()
                            }}/>
                        </Typography>
                    </Stack>
                    <Typography fontSize="12px" sx={{ color: theme.palette.grey[500] }}>
                        {d.body}
                    </Typography>
                </Stack>
            </ListItemButton>
        )}
    </List>
    return (
        <>
            <CTooltip title="???????????? ????">
                <IconButton size="small" aria-describedby={id} variant="contained" onClick={handleClick}>
                    <Badge badgeContent={unSeensCount} color="primary" max={999} anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}>
                        <NotificationsOutlinedIcon />
                    </Badge>
                </IconButton>
            </CTooltip>
            {screenMachedXS ? (
                <Drawer open={open} anchor='right'>
                    {notificationCount > 0 ? (
                        <>
                            <Stack direction="row" justifyContent='space-between'>
                                <IconButton onClick={() => setAnchorEl(null)}>
                                    <CloseOutlined fontSize="small" />
                                </IconButton>
                                <Box sx={{
                                    justifyContent: "center",
                                    flexGrow: 1,
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                    <Typography fontSize="14px" color="primary">
                                        {`?????????? ???? ${unSeensCount>0?unSeensCount:""}`}
                                    </Typography>
                                </Box>
                            </Stack>
                            <Divider />
                            {loading ? <SkeletonFull /> : notificDataRender}
                            <Box sx={{
                                justifyContent: "center",
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <Button size='small'>
                                    ???????????? ?????? ??????????
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Box sx={{
                            py: 1,
                            minWidth: 280,
                            textAlign: "center",
                            display:"flex",
                            alignItems:"center"
                        }}>
                             <IconButton onClick={() => setAnchorEl(null)}>
                                    <CloseOutlined fontSize="small" />
                                </IconButton>
                            <Typography variant="body1" flexGrow={1}>???????? ??????????</Typography>
                        </Box>
                    )}
                </Drawer>
            ) : (
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}

                >
                    <Paper elevation={2}>
                        {notificationCount > 0 ? (
                            <>
                                <Stack direction="row" justifyContent='space-between'>
                                    <Box sx={{
                                        justifyContent: "center",
                                        flexGrow: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        py: 1
                                    }}>
                                        <Typography fontSize="14px" color="primary">
                                            {`?????????? ???? ${unSeensCount>0?unSeensCount:""}`}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Divider />
                                {loading ? <SkeletonFull /> : notificDataRender}
                                <Box sx={{
                                    justifyContent: "center",
                                    flexGrow: 1,
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                    <Button size='small'>
                                        ???????????? ?????? ??????????
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <Box sx={{
                                py: 1,
                                minWidth: 280,
                                textAlign: "center"
                            }}>
                                <Typography variant="body1">???????? ??????????</Typography>
                            </Box>
                        )}
                    </Paper>
                </Popover>
            )}
        </>
    )
}