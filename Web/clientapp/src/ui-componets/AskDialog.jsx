import { Dialog, DialogContent, Slide, Button, Stack, Box, Typography,useTheme } from "@mui/material";
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { PropTypes } from 'prop-types'
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
const TransitionUp = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
AskDialog.defaultProps={
    message:"",
    onYes:()=>{},
    onNo:()=>{},
    open:false
}
export default function AskDialog({ onYes, onNo, open ,message}) {
    const theme=useTheme()
    function yesClickHanlde() {
        onYes()
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={TransitionUp}
            keepMounted
            onClose={() => onNo()}
        >
            <DialogContent>
                <Stack direction="column" spacing={3} alignItems="center">
                    <WarningAmberOutlinedIcon sx={{fontSize:"4rem",color:theme.palette.warning.main}}/>
                    <Typography variant="body1" fontWeight={600} color="secondary">آیا مطمعن هستید ؟</Typography>
                    <Typography variant="body2">{message}</Typography>
                    <Box>
                        <Button sx={{ mr:2 }} size="medium" variant="contained" color="primary" onClick={() => yesClickHanlde()} startIcon={<CheckIcon />}>بله</Button>
                        <Button size="medium" color="secondary" onClick={() => onNo()} startIcon={<CloseIcon />}>خیر</Button>
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}
AskDialog.propTypes = {
    onNo: PropTypes.func.isRequired,
    onYes: PropTypes.func.isRequired
}