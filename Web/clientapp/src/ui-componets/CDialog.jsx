import { CloseOutlined } from '@mui/icons-material';
import {  Dialog, DialogContent, DialogTitle, IconButton, Slide, Stack } from '@mui/material';
import React from 'react'
import { CTooltip } from '.';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function CDialog({ title,size, onClose, open, children }) {
  
    return (
        <Dialog open={open} maxWidth={size} TransitionComponent={Transition}>
            <DialogTitle>
                <Stack direction="row" justifyContent="space-between">
                    {title}
                    <CTooltip title="حروج">
                    <IconButton type="button" onClick={() => onClose()}>
                        <CloseOutlined/>
                    </IconButton>
                    </CTooltip>
                </Stack>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}
CDialog.defaultProps={
    size:"sm"
}