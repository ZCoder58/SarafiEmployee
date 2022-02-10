import React from 'react'
import { Box, IconButton, Popover } from '@mui/material'
import ClickAwayListener from '@mui/core/ClickAwayListener'

export default function MenuAndToggle({ icon, children }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const id = `${Math.random()}`
    const open = Boolean(anchorEl);
    return (

        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <Box>
                <IconButton
                    size="small"
                    aria-describedby={id}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                    {icon}
                </IconButton>
                <Popover
                    anchorEl={anchorEl}
                    open={open}
                    id={id}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    sx={{ minWidth: 180 }}
                >
                    {/* <Paper elevation={6} sx={{ minWidth: "180px" }}> */}
                    {children}
                    {/* </Paper> */}
                </Popover>
            </Box>
        </ClickAwayListener>
    )
}