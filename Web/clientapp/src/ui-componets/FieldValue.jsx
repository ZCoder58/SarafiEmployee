import {Stack, Typography} from '@mui/material'
export default function FieldValue({label,value,icon,...props}){
    return (
        <Stack direction="row" spacing={1}>
            {icon}
        <Typography {...props}>
            {label} : 
        </Typography>
        <Typography {...props}>
            {value} 
        </Typography>
        </Stack>
    )
}