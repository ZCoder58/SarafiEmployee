import { Box } from '@mui/material'
CErrorMessage.defaultProps = {
    show: false,
    message: ""
}
export default function CErrorMessage({ message, show }) {
    return show&&<Box
        sx={{
            color: "#ff3838",
            fontSize:"0.75rem"
        }}>
        {message}
    </Box> 
}