import React from 'react'
import { ListItemButton, Collapse, ListItemText } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material';
export default function MenuListToggle({ text, children }) {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const id = `${Math.random()}`
    return (
        <>
            <ListItemButton
                size="small"
                aria-describedby={id}
                onClick={handleClick}
            >
                <ListItemText primary={text}/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {children}
            </Collapse>
        </>
    )
}