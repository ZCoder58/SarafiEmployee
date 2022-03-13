import {Stack, Typography} from '@mui/material'
export default function FieldValue({label,value}){
    return (
        <Stack direction="row" spacing={1}>
        <Typography fontWeight={900}>
            {label} : 
        </Typography>
        <Typography fontWeight={900}>
            {value} 
        </Typography>
        </Stack>
    )
}